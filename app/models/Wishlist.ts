import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import User from 'App/Models/User'

export default class Wishlist extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'user_id' })
  declare userId: number

  @column({ columnName: 'product_name' })
  declare productName: string

  @column({ columnName: 'product_image' })
  declare productImage: string | null

  @column({ columnName: 'product_price' })
  declare productPrice: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @belongsTo(() => User)
  declare user: any
}
