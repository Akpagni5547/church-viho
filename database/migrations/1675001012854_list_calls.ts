import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { StatutAppel } from 'App/Enums/statut_appel'

export default class extends BaseSchema {
  protected tableName = 'list_calls'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().unsigned()
      table
        .integer('fidele_id')
        .unsigned()
        .references('id')
        .inTable('fideles')
        .notNullable()
        .onDelete('CASCADE')
      table.enum('status', [StatutAppel.PRESENT, StatutAppel.ABSENT, StatutAppel.AUCUN])
      table
        .integer('user_called')
        .unsigned()
        .references('id')
        .inTable('users')
        .notNullable()
        .onDelete('CASCADE')
      table.date('date_called')
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
