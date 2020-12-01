/**
 * @file 发布-订阅模式，避免事件冲突以及先发布后订阅功能
 * @desc 使用命名空间
 */

const Event = (function () {
  const global = this
  let Event
  let _default = 'default'

  Event = function () {
    let _listen, _trigger, _remove, _create
    let _slice = Array.prototype.slice
    let _shift = Array.prototype.shift
    let _unshift = Array.prototype.unshift
    const namespaceCache = {}
    let find

    const each = function (arr, fn) {
      let ret
      for (let i = 0, len = arr.length; i < len; i++) {
        const n = arr[i]
        ret = fn.call(n, i, n)
      }
      return ret
    }

    _listen = function (key, fn, cache) {
      if (!cache[key]) {
        cache[key] = []
      }
      cache[key].push(fn)
    }

    _remove = function (key, cache, fn) {
      if (cache[key]) {
        if (fn) {
          for (let i, len = cache[key].length; i >= 0; i--) {
            if (cache[key][i] === fn) {
              cache[key].splice(i, len)
            }
          }
        } else {
          cache[key] = []
        }
      }
    }

    _trigger = function () {
      const cache = _shift.call(arguments)
      const key = _shift.call(arguments)
      const args = arguments
      const _self = this
      let ret
      const stack = cache[key]

      if (!stack || !stack.length) {
        return
      }
      return each(stack, function () {
        return this.apply(_self, args)
      })
    }

    _create = function (namespace) {
      var namespace = namespace || _default
      const cache = {}, offlineStack = []
    
      const ret = {
        listen: function (key, fn, last) {
          _listen(key, fn, cache)
          if (offlineStack === null) {
            return
          }
          if (last === 'last') {
            offlineStack.length && offlineStack.pop()()
          } else {
            each(offlineStack, function () {
              this()
            })
          }
          offlineStack = null
        },
        one: function (key, fn, last) {
          _remove(key, cache)
          this.listen(key, fn, last)
        },
        remove: function (key, fn) {
          _remove(key, cache, fn)
        },
        trigger: function () {
          let fn, args
          const _self = this

          _unshift.call(arguments, cache)
          args = arguments
          fn = function () {
            return _trigger.apply(_self, args)
          }
          if (offlineStack) {
            return offlineStack.push(fn)
          }
          return fn
        }
      }
      return namespace ? (namespaceCache[namespace] ? namespaceCache[namespace] : namespaceCache[namespace] = ret) : ret
    }
    return {
      create: _create,
      one: function (key, fn, last) {
        const event = this.create()
        event.one(key, fn, last)
      },
      remove: function (key, fn) {
        const event = this.create()
        event.remove(key, fn)
      },
      listen: function (key, fn, last) {
        const event = this.create()
        event.listen(key, fn, last)
      },
      trigger: function () {
        const event = this.create()
        event.trigger.apply(this, arguments)
      }
    }
  }()
  return Event
})