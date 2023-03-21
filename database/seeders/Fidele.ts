import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { FideleFactory } from 'Database/factories'

export default class extends BaseSeeder {
  public async run() {
    await FideleFactory.query()
      .apply('enfant')
      .merge([
        {
          is_baptise: true,
        },
        {
          is_baptise: true,
        },
      ])
      .createMany(2)
    await FideleFactory.query()
      .apply('femme')
      .merge([
        {
          is_baptise: true,
        },
        {
          is_baptise: true,
        },
      ])
      .createMany(2)
    await FideleFactory.query()
      .apply('homme')
      .merge([
        {
          is_baptise: true,
        },
        {
          is_baptise: true,
        },
      ])
      .createMany(2)
    await FideleFactory.query()
      .apply('jeune')
      .merge([
        {
          is_baptise: true,
        },
        {
          is_baptise: true,
        },
      ])
      .createMany(2)
  }
}
