import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import { StatutAppel } from 'App/Enums/statut_appel'
import Fidele from './Fidele'
import User from './User'

export default class ListCall extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public fidele_id: number

  @column()
  public user_called: number

  @column()
  public status: StatutAppel

  @column()
  public dateCalled: Date

  @belongsTo(() => Fidele, {
    foreignKey: 'fidele_id',
  })
  public fidele: BelongsTo<typeof Fidele>

  @belongsTo(() => User, {
    foreignKey: 'user_called',
  })
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
