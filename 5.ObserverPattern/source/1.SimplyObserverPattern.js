/**
 * @file 简单的观察者模式：自定义事件
 * @desc 售楼处和买房者之间的关系：只订阅自己已订阅的内容
 */

const salesOffices = {}
salesOffices.clientList = {}
salesOffices.listen = function (key, fn)  {
  if (!this.clientList[key]) {
    this.clientList[key] = []
  }
  this.clientList[key].push(fn)
}

salesOffices.trigger = function () {
  const key = Array.prototype.shift.call(arguments)
  const fns = this.clientList[key]
  if (!fns || fns.length === 0) {
    return false
  }
  for (let i = 0, fn; fn = fns[i++];) {
    fn.apply(this, arguments)
  }
}

// 买房人1
salesOffices.listen('squareMeter88', function (price) {
  console.log('价格：', price)
})

// 买房人2
salesOffices.listen('squareMeter110', function (price) {
  console.log('价格：', price)
})

// 发布
salesOffices.trigger('squareMeter88', 200000)
salesOffices.trigger('squareMeter110', 3000000)