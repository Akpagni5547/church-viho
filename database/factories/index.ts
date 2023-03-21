import Factory from '@ioc:Adonis/Lucid/Factory'
import { Categories } from 'App/Enums/categories'
import { RoleUser } from 'App/Enums/role_user'
import Fidele from 'App/Models/Fidele'
import User from 'App/Models/User'

export const UserFactory = Factory.define(User, ({ faker }) => ({
  email: faker.internet.email(),
  last_name: faker.internet.userName(),
  first_name: faker.internet.userName(),
  password: '123456',
}))
  .state('admin', (user) => user.role === RoleUser.ADMIN)
  .build()

export const FideleFactory = Factory.define(Fidele, ({ faker }) => ({
  last_name: faker.name.lastName(),
  first_name: faker.name.firstName(),
  fonction: faker.name.firstName(),
  date_of_birth: faker.date.birthdate(),
  groupement: faker.name.jobTitle(),
  lieu_habitation: faker.name.jobArea(),
  status: faker.lorem.word(6),
  is_baptise: false,
}))
  .state('homme', (fidele) => (fidele.categories = Categories.HOMME))
  .state('enfant', (fidele) => (fidele.categories = Categories.ENFANT))
  .state('femme', (fidele) => (fidele.categories = Categories.FEMME))
  .state('jeune', (fidele) => (fidele.categories = Categories.JEUNE))
  .build()
