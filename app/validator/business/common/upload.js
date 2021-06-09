import { LinValidator, Rule } from '../../../pluto'

class UploadValidator extends LinValidator {
  constructor () {
    super()
    this.fileMd5 = new Rule('isMD5', '文件md5参数错误')
    this.albumId = new Rule('isInt', '相册id必须为正整数', { min: 1 })
  }
}

export {
  UploadValidator,
}
