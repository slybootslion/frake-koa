import { LinValidator, Rule } from '../../../pluto'

class NoParamsValidator extends LinValidator {
  constructor () {
    super()
    this.no = [new Rule('isOptional')]
  }
}

export {
  NoParamsValidator,
}
