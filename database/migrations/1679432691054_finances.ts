import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { FinancesType } from 'App/Enums/finances'

export default class extends BaseSchema {
  protected tableName = 'finances'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title')
      table.text('description')
      table.integer('amount')
      table.enum('type_finance', [FinancesType.ENTREE, FinancesType.SORTIE])
      table
        .integer('user_do_it')
        .unsigned()
        .references('id')
        .inTable('users')
        .notNullable()
        .onDelete('CASCADE')

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
