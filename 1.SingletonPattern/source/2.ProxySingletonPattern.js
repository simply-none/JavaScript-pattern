/**
 * @file 代理单例模式（透明的单例模式）：使用了new XXX()这种非常规模式来获取实例
 * @desc 把管理单例功能和创建单例功能分离🍗【单一职责原则】
 *        涉及知识点：单一职责原则、闭包、立即执行函数
 */

// 创建div
const CreateDiv = function (html) {
  this.html = html
  this.init()
}

CreateDiv.prototype.init = function () {
  const div = document.createElement('div')
  div.innerHTML = this.html
  document.body.appendChild(div)
}

// 管理单例（代理类）
const ProxySingletonCreateDiv = (function () {
  let instance
  return function (html) {
    if (!instance) {
      instance = new CreateDiv(html)
    }
    return instance
  }
})()

const proxy_singleton_a = new ProxySingletonCreateDiv('jousindea1')
const proxy_singleton_b = new ProxySingletonCreateDiv('jousindea2')

// proxy_singleton_a === proxy_singleton_b true
console.log('proxy_singleton_a === proxy_singleton_b', proxy_singleton_a === proxy_singleton_b)