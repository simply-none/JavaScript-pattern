/**
 * @file 使用虚拟代理合并http请求
 * @desc 收集一段时间内的请求，然后一次性发送给服务器（针对实时性较低的系统），以此减轻服务器压力
 */

const syncFile = function (id) {
  console.log('开始同步文件，id为：' + id)
}

const proxySyncFile = (function () {
  // cache只有在函数第一次执行时初始化
  const cache = []
  let timer
  return function (id) {
    cache.push(id)
    if (timer) {
      return false
    }
    // 利用定时器为微任务的特性，同一个事件循环内宏任务执行完之后才会执行微任务
    timer = setTimeout(function () {
      syncFile(cache.join(''))
      clearTimeout(timer)
      timer = null
      cache.length = 0
    }, 2000)
  }
})()

const checkbox = document.getElementsByTagName('input')

// 通过循环，cache一直累加，知道循环结束，开始执行定时器任务
for (let i = 0, c; c = checkbox[i++];) {
  c.onclick = function () {
    if (this.checked === true) {
      proxySyncFile(this.id)
    }
  }
}