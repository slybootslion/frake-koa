import { LinValidator, Rule } from '../../pluto'

class LoginValidator extends LinValidator {
  constructor () {
    super()
    this.username = [
      new Rule(
        'matches',
        '用户名需在4-16个字符之间，且不能有特殊字符',
        /^[a-zA-Z0-9\u4e00-\u9fa5_]{4,16}$/,
      ),
    ]
    this.password = [
      new Rule(
        'matches',
        '密码需要6-32个数字字母组合',
        /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,32}$/,
      ),
    ]
  }
}

export {
  LoginValidator,
}
