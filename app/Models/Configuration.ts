import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Configuration extends BaseModel {
  @column()
  public id: number

  @column()
  public solde: number
}
