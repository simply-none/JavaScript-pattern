/**
 * @file 缓存代理：计算
 */

const mult = function () {
  let a = 1
  for (let i = 0, len = arguments.length; i < len; i++) {
    a = a * arguments[i]
  }
  return a
}

const plus = function () {
  let a = 0
  for (var i = 0, len = arguments.length; i < len; i++) {
    a = a + arguments[i]
  }
  return a
}

const createProxyFactory = function (fn) {
  const cache = []
  return function () {
    const args = Array.prototype.join.call(arguments, ',')
    if (args in cache) {
      return cache[args]
    }
    return cache[args] = fn.apply(this, arguments)
  }
}

const proxyMult = createProxyFactory(mult)
const proxyPlus = createProxyFactory(plus)

console.log(proxyMult(1, 2, 3, 4))
console.log(proxyMult(1, 2, 3, 4))