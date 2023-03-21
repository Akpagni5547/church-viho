import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Configuration from '../../app/Models/Configuration'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Configuration.create({
      solde: 0,
    })
  }
}
