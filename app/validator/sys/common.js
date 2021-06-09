import { LinValidator, Rule, config } from '../../pluto'
import validator from 'validator'

class PositiveIdValidator extends LinValidator {
  constructor () {
    super()
    this.id = new Rule('isInt', 'id必须为正整数', { min: 1 })
  }
}

class PositiveIdOptionalValidator extends LinValidator {
  constructor () {
    super()
    this.id = [
      new Rule('isOptional'),
      new Rule('isInt', 'id必须为正整数', { min: 1 }),
    ]
  }
}

class PaginateValidator extends LinValidator {
  constructor () {
    super()
    this.count = [
      new Rule('isOptional', '', config.getItem('countDefault')),
      new Rule('isInt', 'count必须为正整数', { min: 1 }),
    ]
    this.page = [
      new Rule('isOptional', '', config.getItem('pageDefault')),
      new Rule('isInt', 'page必须为整数，且大于等于0', { min: 0 }),
    ]
  }
}

class PaginateRequiredValidator extends LinValidator {
  constructor () {
    super()
    this.count = [
      new Rule('isInt', 'count必须为正整数', { min: 1 }),
    ]
    this.page = [
      new Rule('isInt', 'page必须为整数，且大于等于0', { min: 0 }),
    ]
  }
}

class UuidValidator extends LinValidator {
  constructor () {
    super()
    this.uuid = [
      new Rule('isUUID', '参数必须是uuid'),
    ]
  }
}

class IdsIntArrayValidator extends LinValidator {
  constructor () {
    super()
    this.ids = []
  }

  validateIds (data) {
    return validateIntArray(data, 'body', 'ids', '每个id必须是正整数')
  }
}

function isOptional (val) {
  // undefined , null , ""  , "    ", 皆通过
  if (val === undefined) {
    return true
  }
  if (val === null) {
    return true
  }
  if (typeof val === 'string') {
    return val === '' || val.trim() === ''
  }
  return false
}

export function validateIntArray (data, type, key, msg) {
  const ids = data[type][key]
  if (isOptional(ids)) {
    return true
  }
  if (!Array.isArray(ids)) {
    return [false, msg]
  }
  for (let id of ids) {
    if (typeof id === 'number') {
      id = String(id)
    }
    if (!validator.isInt(id, { min: 1 })) {
      return [false, msg]
    }
  }
  return true
}

export {
  PaginateValidator,
  PaginateRequiredValidator,
  PositiveIdValidator,
  PositiveIdOptionalValidator,
  UuidValidator,
  IdsIntArrayValidator,
}
