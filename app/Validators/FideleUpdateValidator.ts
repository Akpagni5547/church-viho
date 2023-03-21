import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Categories } from 'App/Enums/categories'

export default class FideleUpdateValidator {
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
    date_of_birth: schema.date.optional(),
    categories: schema.enum.optional([
      Categories.ENFANT,
      Categories.FEMME,
      Categories.HOMME,
      Categories.JEUNE,
    ]),
    phone: schema.string.optional(),
    first_name: schema.string.optional(),
    last_name: schema.string.optional(),
    fonction: schema.string.optional(),
    groupement: schema.string.optional(),
    lieu_habitation: schema.string.optional(),
    status: schema.string.optional(),
    is_baptise: schema.boolean.optional(),
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
  public messages: CustomMessages = {}
}
