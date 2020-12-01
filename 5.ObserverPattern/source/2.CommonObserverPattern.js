/**
 * @file 通用的观察者模式
 * @desc 多对多，可取消订阅
 */

const event = {
  clientList: [],
  listen: function (key, fn) {
    if (!this.clientList[key]) {
      this.clientList[key] = []
    }
    this.clientList[key].push(fn)
  },
  trigger: function () {
    const key = Array.prototype.shift.call(arguments)
    const fns = this.clientList[key]
    if (!fns || fns.length === 0) {
      return false
    }
    for (let i = 0, fn; fn = fns[i++];) {
      fn.apply(this, arguments)
    }
  },
  // 取消订阅
  remove: function (key, fn) {
    const fns = this.clientList[key]
    // key对应消息未被人订阅，直接返回
    if (!fns) {
      return false
    }
    // 未传入具体回调函数，则取消key对应的所有订阅
    if (!fn) {
      fns && (fns.length = 0)
    } else {
      for (let len = fns.length - 1; len >= 0; len--) {
        // 反向遍历订阅的回调函数列表
        const _fn = fns[len]
        if (_fn === fn) {
          // 删除订阅者回调函数
          fns.splice(len, 1)
        }
      }
    }
  }
}

// 给所有对象动态安装发布-订阅功能
const installEvent = function (obj) {
  for (let i in event) {
    obj[i] = event[i]
  }
}

// 给售楼处对象动态增加发布-订阅功能
const salesOffices = {}
installEvent(salesOffices)
// 买房人1订阅
salesOffices.listen('squareMeter88', fn1 = function (price) {
  console.log('价格：', price)
})
// 买房人2订阅
salesOffices.listen('squareMeter110', fn2 = function (price) {
  console.log('价格：', price)
})

// 删除买房人1的订阅
salesOffices.remove('squareMeter88', fn1)

// 发送订阅
salesOffices.trigger('squareMeter88', 2000000)