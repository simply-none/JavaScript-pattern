/**
 * @file 传统语言下的策略模式：
 */

// 策略类：
const performanceS = function () {}
performanceS.prototype.calculate = function (salary) {
  return salary * 4
}

const performanceA = function () {}
performanceA.prototype.calculate = function (salary) {
  return salary * 3
}

const performanceB = function () {}
performanceB.prototype.calculate = function (salary) {
  return salary * 2
}

// 奖金类：
const Bonus = function () {
  // 初始化
  this.salary = null
  this.strategy = null
}

Bonus.prototype.setSalary = function (salary) {
  this.salary = salary
}

// 设置薪资对应的策略
Bonus.prototype.setStrategy = function (strategy) {
  this.strategy = strategy
}

Bonus.prototype.getBonus = function () {
  return this.strategy.calculate(this.salary)
}

// 使用
const bonus = new Bonus()
bonus.setSalary(10000)
bonus.setStrategy(new performanceA())
console.log(bonus.getBonus())
