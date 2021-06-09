import { LinValidator, Rule } from '../../../pluto'
import { PaginateValidator, PositiveIdOptionalValidator, PositiveIdValidator, validateIntArray } from '../../sys/common'

class SentenceCategoryValidator extends LinValidator {
  constructor () {
    super()
    this.name = [
      new Rule('isLength', '句子分类名称在8个字符之内', { min: 1, max: 8 }),
      new Rule(
        'matches',
        '句子名称不能有特殊字符',
        /^[\u4E00-\u9FA5A-Za-z0-9_]+$/
      ),
    ]
  }
}

class SentenceCategoryDetailValidator extends PaginateValidator {
  constructor () {
    super()
    this.id = new Rule('isInt', 'id必须为正整数', { min: 1 })
  }
}

class SentenceSingleValidator extends PositiveIdValidator {
  constructor () {
    super()
    this.content = new Rule('isLength', '句子内容最多500个字符', { min: 1, max: 500 })
    this.isEnable = new Rule('isBoolean', '是否启用必须是布尔值')
    this.author = [
      new Rule('isOptional'),
      new Rule('isLength', '作者出处最多20个字符', { min: 1, max: 20 }),
    ]
  }
}

class SentenceSingleEditValidator extends SentenceSingleValidator {
  constructor () {
    super()
    this.categoryId = new Rule('isInt', 'id必须为正整数', { min: 1 })
  }
}

class ThemeValidator extends LinValidator {
  constructor () {
    super()
    this.name = new Rule('isLength', '名称最多10个字符', { min: 1, max: 10 })
    this.albumId = new Rule('isInt', '所选相册id必须为正整数', { min: 1 })
    this.sentenceId = new Rule('isInt', '所选句子分类id必须为正整数', { min: 1 })
    // this.style = [
    //   new Rule('isIn', '样式必须在特定数组中', Object.values(ThemeStyleEnumerate)),
    // ]
    this.isDefault = [
      new Rule('isOptional'),
      new Rule('isBoolean', '是否默认主题必须是布尔值'),
    ]
    this.info = [
      new Rule('isOptional'),
      new Rule('isLength', 'info最多100个字符', { min: 1, max: 100 }),
    ]
    this.morningPicId = []
    this.afternoonPicId = []
    this.eveningPicId = []
    this.id = [
      new Rule('isOptional'),
      new Rule('isInt', 'id必须为正整数', { min: 1 }),
    ]
  }

  validateMorningPicIds (data) {
    return validateIntArray(data, 'body', 'morningPicId', '早晨的每个id必须是正整数')
  }

  validateAfternoonPicIds (data) {
    return validateIntArray(data, 'body', 'afternoonPicId', '下午的每个id必须是正整数')
  }

  validateEveningPicIds (data) {
    return validateIntArray(data, 'body', 'eveningPicId', '晚上的每个id必须是正整数')
  }
}

class ThemeUpdateValidator extends LinValidator {
  constructor () {
    super()
    this.isDefault = new Rule('isBoolean', '是否默认主题必须是布尔值')
    this.isEnable = new Rule('isBoolean', '是否默认主题必须是布尔值')
    this.id = new Rule('isInt', 'id必须为正整数', { min: 1 })
    this.type = new Rule('isIn', '传递正确修改类型', ['default', 'enable', 'del'])
  }
}

class ThemeEnableValidator extends PositiveIdValidator {
  constructor () {
    super()
    this.isEnable = new Rule('isBoolean', '状态必须时布尔值')
  }
}

class LinkFormValidator extends PositiveIdOptionalValidator {
  constructor () {
    super()
    this.title = new Rule('isLength', '标题长度最多30个字符', { min: 1, max: 30 })
    this.link = new Rule('isURL', '必须是“标肿”的网址')
    this.shortTitle = [
      new Rule('isOptional'),
      new Rule('isLength', '简称最多10个字符', { min: 1, max: 10 }),
    ]
    this.isDefault = [
      new Rule('isOptional'),
      new Rule('isBoolean', '是否默认链接必须是布尔值'),
    ]
  }
}

export {
  SentenceCategoryValidator,
  SentenceCategoryDetailValidator,
  SentenceSingleValidator,
  SentenceSingleEditValidator,
  ThemeValidator,
  ThemeUpdateValidator,
  ThemeEnableValidator,
  LinkFormValidator,
}
