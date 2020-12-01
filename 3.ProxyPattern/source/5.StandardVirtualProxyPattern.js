/**
 * @file 一个标准虚拟代理实例
 */

const proxyConsole = (function () {
  const cache = []
  const handler = function (event) {
    if (event.keyCode === 113) {
      const script = document.createElement('script')
      script.onload = function () {
        for (let i = 0, fn, fn = cache[i++];) {
          fn()
        }
      }
      script.src = 'console.js'
      document.getElementsByTagName('head')[0].appendChild(script)
      // 只加载一次
      document.body.removeEventListener('keydown', handler)
    }
  }
  document.body.addEventListener('keydown', handler, false)
  return {
    log: function () {
      const args = arguments
      cache.push(function () {
        return Console.log.apply(Console, args)
      })
    }
  }
})()

const Console = {
  log: function () {
    // 本体代码
  }
}

proxyConsole.log(12)