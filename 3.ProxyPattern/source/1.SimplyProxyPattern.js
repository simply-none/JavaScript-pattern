/**
 * @file 简单的代理模式：小明追女神
 * @desc 小明通过一个中间人观察女神的喜好，在最佳时刻大概率追到女神
 */

const Flower = function () {}

const xiaoMing = {
  sendFlower: function (target) {
    target.receiveFlower()
  }
}

// 女神的代理中间人
const midPeople = {
  receiveFlower: function () {
    goddess.listenGoodMood (function () {
      // 延迟创建flower对象
      const flower = new Flower()
      goddess.receiveFlower(flower)
    })
  }
}

const goddess = {
  receiveFlower: function (flower){
    console.log('收到花： ' + flower)
  },
  listenGoodMood: function (fn) {
    setTimeout(() => {
      fn()
    }, 10000);
  }
}

xiaoMing.sendFlower(midPeople)