/**
 * @file 非透明的单例模式：此种模式构建简单
 *       但是使用了Singleton.getInstance（非常规new XXX()）这种非常规模式来获取实例，增加了该类的不透明性
 * @desc 涉及知识点：单一职责原则、闭包、立即执行函数
 */

// 1. 唯一性标志instance：此处的instance是值类的instance，即🌳
const Singleton = function (name) {
  this.name = name
  this.instance = null
}

Singleton.prototype.getName = function () {
  return this.name
}

Singleton.getInstance = function (name) {
  // 此处的this指向类Singleton：包括两个属性：getInstance、instance
  // 🌳
  if (!this.instance) {
    this.instance = new Singleton(name)
  }
  // 返回一个对象实例
  return this.instance
}

const single_a = Singleton.getInstance('jake')
const single_b = Singleton.getInstance('tom')

// single_a === single_a true
console.log('single_a === single_a', single_a === single_b)



// 2. 唯一性标志：instance_two：instance_two放在getinstance_two函数中：此处的instance_two为立即执行函数内部的instance_two，由于使用了let和闭包，该变量在脚本文件执行期间不消失，
const SingletonTwo = function (name) {
  this.name = name
}

SingletonTwo.prototype.getName = function () {
  console.log(this.name)
}

/**
 * @desc 创建唯一的类实例
 *       1. 通过【闭包：函数执行完后引用的函数内部变量一直在内存中不消失】
 *       2. 立即执行函数（IIFE）
 * @param {*} name 名字
 * @return {object} instance_two 对象实例
 */
SingletonTwo.getInstance = (function () {
  // ---------START---------------
  // 这个模块的内容仅在第一次运行时执行，之后已经记忆住了该函数是直接执行下面的返回函数🍎
  let instance_two = null
  console.log(instance_two, 'instance_two')
  // ---------END---------------
  // 🍎
  return function (name) {
    if (!instance_two) {
      instance_two = new SingletonTwo(name)
    }
    return instance_two
  }
})()

const single_two_a = SingletonTwo.getInstance('jake')
const single_two_b = SingletonTwo.getInstance('tom')

// single_two_a === single_two_b true
console.log('single_two_a === single_two_b', single_two_a === single_two_b)