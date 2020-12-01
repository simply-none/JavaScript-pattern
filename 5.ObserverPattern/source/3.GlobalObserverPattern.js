/**
 * @file 全局的发布-订阅模式
 * @desc 通过中介获取消息:则发布和订阅两者之间不需知道对方的细节
 */

// 中介对象
const Event = (function () {
  const clientList = {}
  let listen, trigger, remove

  listen = function (key, fn) {
    if (!clientList[key]) {
      clientList[key] = []
    }
    clientList[key].push(fn)
  }

  trigger = function () {
    const key = Array.prototype.shift.call(arguments)
    const fns = clientList[key]
    if (!fns || fns.length === 0) {
      return false
    }
    for (let i = 0, fn; fn = fns[i++];) {
      fn.apply(this, arguments)
    }
  }

  remove = function (key, fn) {
    const fns = clientList[key]
    if (!fns) {
      return false
    }
    if (!fn) {
      fns && (fns.length = 0)
    } else {
      for (let len = fns.length - 1; len >= 0; len--) {
        const _fn = fns[len]
        if (_fn === fn) {
          fns.splice(len, 1)
        }
      }
    }
  }
  return {
    listen,
    tirgger,
    remove
  }
})()

// 购房者1订阅消息
Event.listen('squareMeter88', function (price) {
  console.log('价格：', price)
})

// 售楼部发布消息
Event.trigger('squareMeter88', 2000000)