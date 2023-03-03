import { track, trigger } from './effect'

const get = createGetter()

function createGetter() {
  return function get(target: object, key: string | symbol, receiver: object) {
    const res = Reflect.get(target, key, receiver)
    track(target, key)
    return res
  }
}

const set = createSetter()

function createSetter() {
  return function set(target: object, key: string | symbol, val: unknown, receiver: object){
    const result = Reflect.set(target,key,val,receiver)
    trigger(target,key,val)
    return result
  }
}

export const mutableHandlers: ProxyHandler<object> = {
  get,
  set
}
