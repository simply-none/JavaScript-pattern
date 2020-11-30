/**
 * @file 惰性单例：只有在需要的时候才会进行创建对象实例，而非页面加载时就立马创建；文件1、2均为惰性单例
 * @desc 通用的单例模式：能够覆盖更多的情形，需将通用逻辑进行抽离
 */

// 管理单例的逻辑（通用）
const getSingle = function (fn) {
  let result
  return function () {
    return result || (result = fn.apply(this, arguments))
  }
}

// 创建单例逻辑（可以是div、p、iframe等）
const createLoginLayer = function () {
  const div = document.createElement('div')
  div.innerHTML = '我是登录弹窗'
  div.style.display = 'none'
  document.body.appendChild(div)
  return div
}

const createSingleLoginLayer = getSingle(createLoginLayer)

document.getElementById('loginBtn').onclick = function () {
  const loginLayer = createSingleLoginLayer()
  loginLayer.style.display = 'block'
}