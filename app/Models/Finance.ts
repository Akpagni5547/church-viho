import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { FinancesType } from 'App/Enums/finances'
import User from './User'

export default class Finance extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public amount: number

  @column()
  public typeFinance: FinancesType

  @column()
  public userDoIt: number

  @belongsTo(() => User, {
    foreignKey: 'fidele_id',
  })
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
