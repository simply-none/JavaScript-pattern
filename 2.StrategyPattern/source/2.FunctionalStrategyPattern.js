/**
 * @file javascript函数式策略模式：
 */

// 策略类：
const strategies = {
  'S': function (salary) {
    return salary * 4
  },
  'A': function (salary) {
    return salary * 3
  },
  'B': function (salary) {
    return salary * 2
  }
}

// 奖金类：
const calculateBonus = function (salary, strategy) {
  return strategies[strategy](salary)
}

// 使用
console.log(calculateBonus(10000, 'A'))
