import Factory from '@ioc:Adonis/Lucid/Factory'
import { RoleUser } from 'App/Enums/role_user'
import User from 'App/Models/User'

export const UserFactory = Factory.define(User, ({ faker }) => ({
  email: faker.internet.email(),
  last_name: faker.internet.userName(),
  first_name: faker.internet.userName(),
  password: '123456',
}))
  .state('admin', (user) => user.role === RoleUser.ADMIN)
  .build()
