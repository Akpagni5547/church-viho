import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Categories } from '../Enums/categories'

export default class FideleAddValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    date_of_birth: schema.date(),
    categories: schema.enum([
      Categories.ENFANT,
      Categories.FEMME,
      Categories.HOMME,
      Categories.JEUNE,
    ]),
    first_name: schema.string(),
    phone: schema.string(),
    last_name: schema.string(),
    fonction: schema.string(),
    groupement: schema.string(),
    lieu_habitation: schema.string(),
    status: schema.string(),
    is_baptise: schema.boolean(),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    'email.required': 'Veuillez renseigner un email',
    'email.unique': 'Cet email est déjà utilisé',
    'role.required': 'Veuillez renseigner un role',
    'role.enum': 'Veuillez renseigner role valide',
    'first_name.required': 'Veuillez renseigner un nom',
    'last_name.required': 'Veuillez renseigner un prenom',
  }
}