import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { RoleUser } from 'App/Enums/role_user'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    await User.create({
      email: 'helios@gmail.com',
      first_name: 'Helios',
      last_name: 'Orphus',
      password: '123456',
      role: RoleUser.ADMIN,
    })
  }
}
