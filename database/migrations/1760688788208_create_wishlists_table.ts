import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateWishlistsTable extends BaseSchema {
  protected tableName = 'wishlists'

  public async up() {
  this.schema.createTable(this.tableName, (table: any) => {
      table.increments('id').notNullable()
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.string('product_name').notNullable()
      table.string('product_image').nullable()
      table.decimal('product_price', 10, 2).nullable()

      table.timestamp('created_at').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
