import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
/**
 * 默认导出一个数组，数组的每个对象都是一个单独的导出文件配置
 */
export default [{
  // 入口文件
  input: 'packages/vue/src/index.ts',
  // 打包出口
  output: [
    // 导出 iife 模式包
    {
      // 开启sourceMap
      sourcemap: true,
      // 导出文件地址
      file: 'packages/vue/dist/vue.js',
      // 生成包的格式
      format: 'iife',
      // 变量名
      name: 'Vue'
    }
  ],
  // 插件
  plugins: [
    typescript({
      sourceMap: true
    }),
    // 模块导入路径补全
    resolve(),
    // 转commonjs 为 ESM
    commonjs()
  ]
}]