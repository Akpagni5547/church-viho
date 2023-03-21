import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { Categories } from 'App/Enums/categories'
import ListCall from './ListCall'

export default class Fidele extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public first_name: string

  @column()
  public last_name: string

  @column()
  public fonction: string

  @column()
  public groupement: string

  @column()
  public date_of_birth: Date

  @column()
  public lieu_habitation: string

  @column()
  public status: string

  @column()
  public phone: string

  @column()
  public is_baptise: boolean

  @column()
  public categories: Categories

  @column()
  public count_missing: number

  @hasMany(() => ListCall, { foreignKey: 'fidele_id' })
  public listCalled: HasMany<typeof ListCall>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
