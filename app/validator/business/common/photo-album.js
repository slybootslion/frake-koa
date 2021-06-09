import { LinValidator, Rule } from '../../../pluto'
import { PaginateValidator, PositiveIdValidator } from '../../sys/common'

class PhotoAlbumValidator extends LinValidator {
  constructor () {
    super()
    this.name = [
      new Rule('isLength', '相册名称在25个字符之内', { min: 1, max: 25 }),
      new Rule(
        'matches',
        '相册名称不能有特殊字符',
        /^[\u4E00-\u9FA5A-Za-z0-9_]+$/
      ),
    ]
    this.info = [
      new Rule('isOptional'),
      new Rule('isLength', '相册描述最多80个字符', { min: 1, max: 80 }),
    ]
  }
}

class PhotoAlbumDetailValidator extends PaginateValidator {
  constructor () {
    super()
    this.id = new Rule('isInt', 'id必须为正整数', { min: 1 })
  }
}

class ImageUpdateValidator extends PositiveIdValidator {
  constructor () {
    super()
    this.name = new Rule('isLength', '图片描述小于100个字符', { min: 1, max: 100 })
  }
}

export {
  PhotoAlbumValidator,
  PhotoAlbumDetailValidator,
  ImageUpdateValidator,
}
