# VUE3

命令式和声明式

vue封装了命令式的逻辑，对外暴露声明式接口

命令式的可维护性<声明式

响应性语法糖让vue的响应式系统变成了一个运行时+编译时结合的复杂系统

vue3 的compile（编译器）主要作用把模板template中的非真html编译成`render`函数，然后通过render挂载到对应的DOM上

副作用：是指我们对数据进行`setter`或`getter`后，产生的一些列后果，副作用可能是有多个的

reactivity、runtime、complier

影响视图变化的数据 才是响应式数据、

依赖收集的过程本质上就是targetMap和ReactiveEffect之间的关联 让我们可以根据指定对象的指定属性来找到该属性对应的effect(存在一个fn函数 就是当前触发该属性get行为的函数)

创建proxy

收集effect的依赖

触发收集的依赖
