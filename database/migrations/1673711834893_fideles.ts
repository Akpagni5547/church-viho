import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { Categories } from 'App/Enums/categories'

export default class extends BaseSchema {
  protected tableName = 'fideles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().unsigned()
      table.string('first_name')
      table.string('last_name')
      table.string('fonction')
      table.string('groupement')
      table.date('date_of_birth')
      table.string('lieu_habitation')
      table.string('status')
      table.string('phone')
      table.boolean('is_baptise')
      table.integer('count_missing').defaultTo(0)
      table
        .enum('categories', [
          Categories.ENFANT,
          Categories.FEMME,
          Categories.HOMME,
          Categories.JEUNE,
        ])
        .notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
