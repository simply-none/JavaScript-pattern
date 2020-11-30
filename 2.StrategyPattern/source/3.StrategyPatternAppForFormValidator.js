/**
 * @file 策略模式在表单验证的应用
 */

// 策略类
const strategies = {
  isNonEmpty: function (value, errorMsg) {
    if (value === '') {
      return errorMsg
    }
  },
  minLength: function (value, length, errorMsg) {
    if (value.length < length) {
      return errorMsg
    }
  },
  isMobile: function (value, errorMsg) {
    if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
      return errorMsg
    }
  }
}

// Validator类：
const Validator = function () {
  this.cache = []
}

Validator.prototype.add = function (dom, rules) {
  const self = this
  for (let i = 0, rule; rule = rules[i++];) {
    (function(rule){
      const strategyArr = rule.strategy.split(':')
      const errorMsg = rule.errorMsg
      // push一个函数到消息数组中
      self.cache.push(function() {
        const strategy = strategyArr.shift()
        strategyArr.unshift(dom.value)
        strategyArr.push(errorMsg)
        // 返回一个函数
        return strategies[strategy].apply(dom, strategyArr)
      })
    })(rule)
  }
}

Validator.prototype.start = function () {
  for (let i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
    const msg = validatorFunc()
    if (msg) {
      return msg
    }
  }
}

const validaFunc = function () {
  const validator = new validator()
  // 添加校验规则
  validator.add(registerForm.userName, {
      strategy: 'isNonEmpty',
      errorMsg: '用户名不能为空'
    }, {
      strategy: 'minLength:10',
      errorMsg: '用户名长度不能小于10'
    })

  const errorMsg = validator.start()
  return errorMsg
}

const registerForm = document.getElementById('registerForm')
registerForm.onsubmit = function () {
  const errorMsg = validaFunc()
  if (errorMsg) {
    console.log(errorMsg, 'errorMsg')
    return false
  }
}