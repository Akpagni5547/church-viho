import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { RoleUser } from 'App/Enums/role_user'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('email', 255).notNullable().unique()
      table.string('first_name').notNullable().unique()
      table.string('last_name').notNullable().unique()
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()
      table.enum('role', [RoleUser.ADMIN, RoleUser.USER]).notNullable().defaultTo(RoleUser.USER)
      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
