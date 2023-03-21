import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { RoleUser } from 'App/Enums/role_user'
import ListCall from './ListCall'
import Finance from './Finance'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public first_name: string

  @column()
  public last_name: string

  @column()
  public phone: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public role: RoleUser

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => ListCall, { foreignKey: 'user_created' })
  public listCalled: HasMany<typeof ListCall>

  @hasMany(() => Finance, { foreignKey: 'user_do_it' })
  public finances: HasMany<typeof Finance>

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
