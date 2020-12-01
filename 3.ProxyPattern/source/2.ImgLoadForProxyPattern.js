/**
 * @file 虚拟代理实现图片预加载
 * @desc 在图片加载完成之前，使用一张替代的图片进行展示，放在加载前的空白
 */

// 常见的模式：
const myImage = (function () {
  const imgNode = document.createElement('img')
  document.body.appendChild(imgNode)
  return {
    setSrc: function (src) {
      imgNode.src = src
    }
  }
})()

const proxyImage = (function () {
  const img = new Image()
  img.onload = function () {
    imgNode.setSrc(this.src)
  }
  return {
    setSrc: function (src) {
      myImage.setSrc('http://www.baiduimage.com/proxy.png')
      img.src = src
    }
  }
})()

proxyImage.setSrc('http://www.baiduimage.com/true.png')