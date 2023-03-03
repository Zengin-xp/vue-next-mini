import { createDep, Dep } from './dep'
import { isArray } from '@vue/shared'

type KeyToDepMap = Map<any, Dep>
const targetMap = new WeakMap<any, KeyToDepMap>()
export function effect<T = any>(fn: () => T) {
  const _effect = new ReactiveEffect(fn)
  _effect.run()
}
export let activeEffect: ReactiveEffect | undefined
export class ReactiveEffect<T = any> {
  constructor(public fn: () => T) {}

  run() {
    // 当前被激活的effect
    activeEffect = this
    // 执行fn()函数 完成第一次get函数触发
    return this.fn()
  }
}

/**
 * 收集依赖
 * @param target 指定对象
 * @param key 指定属性
 */
export function track(target: object, key: unknown) {
  if (!activeEffect) return
  let  depsMap = targetMap.get(target)
  if (!depsMap){
    targetMap.set(target,(depsMap = new Map()))
  }

  let dep = depsMap.get(key)
  if (!dep){
    depsMap.set(key, (dep = createDep()))
  }

  trackEffects(dep)
}

/**
 * 利用dep依次跟踪指定key的所有effect
 */
export function trackEffects(dep: Dep) {
  dep.add(activeEffect!)
}

/**
 * 触发依赖
 * @param target WeakMap的key
 * @param key 代理对象的key当依赖触发时，需要根据该key获取
 * @param newValue
 */
export function trigger(target: object, key: unknown, newValue: unknown) {
  // 根据target获取存储的map实例
  const depsMap = targetMap.get(target)
  // 如果map不存在 则直接return
  if (!depsMap) {
    return
  }
  // 根据key 从depsMap中取出value，该value是一个ReactiveEffect 类型的数据
  const dep: Dep | undefined = depsMap.get(key)
  // 如果effect不存在则直接return
  if (!dep) {
    return
  }

  triggerEffects(dep)
}

/**
 * 依次触发dep中保存的依赖
 * @param dep
 */
export function triggerEffects(dep: Dep){
  const effects = isArray(dep) ? dep : [...dep]
  // 依次触发依赖
  for (const effect of effects){
    triggerEffect(effect)
  }
}

/**
 * 触发指定依赖
 * @param effect
 */
export function triggerEffect(effect: ReactiveEffect) {
  effect.run()
}