/**
 * @file 一个简单的迭代器模式
 */

const each = function (arr, callback) {
  for (let i = 0, len = arr.length; i < len; i++) {
    callback.call(arr[i], i, arr[i])
  }
}

each([1, 2, 3], function (i, n) {
  console.log([i, n])
})