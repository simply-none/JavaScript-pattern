/**
 * @file 外部迭代器的应用
 */

const Iterator = function (obj) {
  let current = 0
  const next = function () {
    current += 1
  }
  const isDone = function () {
    return current >= obj.length
  }
  const getCurrentItem = function () {
    return obj[current]
  }
  return {
    next,
    isDone,
    getCurrentItem,
    length: obj.length
  }
}

const compare = function (iterator1, iterator2) {
  if (iterator1.length !== iterator2.length) {
    console.log('iterator1 !== iterator2')
  }
  while(!iterator1.isDone() && !iterator2.isDone()) {
    if (iterator1.getCurrentItem() !== iterator2.getCurrentItem()) {
      throw new Error('iterator1 !== iterator2')
    }
    iterator1.next()
    iterator2.next()
  }
  console.log('iterator1 === iterator2')
}