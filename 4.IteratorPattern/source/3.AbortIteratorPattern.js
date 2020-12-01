/**
 * @file 中止迭代器：像break一样跳出循环
 * @desc 提供一种最适合的文件上传的方式，当不适合的方式时继续下一个，直到找到适合的中止
 */

const getActiveUploadObj = function () {
  try {
    return new ActiveXObject('txftnactiveX.FinUpload')
  } catch (e) {
    return false
  }
}

const getFlashUploadObj = function () {
  if (supportFlash()) {
    const str = '<object type="application/x-shockwave-flash"></object>'
    return $(str).appendTo($('body'))
  }
  return false
}

const getFormUploadObj = function () {
  const str = '<imput name="file" type="file" class="ui-file"/>'
  return $(str).appendTo($('body'))
}

// 迭代器
const iteratorUploadObj = function () {
  for (let i = 0, fn; fn = arguments[i++];) {
    const uploadObj = fn()
    if (uploadObj !== false) {
      return uploadObj
    }
  }
}

const uploadObj = iteratorUploadObj(getActiveUploadObj, getFlashUploadObj, getFormUploadObj)