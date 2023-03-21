import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserUpdateValidator from 'App/Validators/UserUpdateValidator'
import UserValidator from 'App/Validators/UserValidator'

export default class UsersController {
  public async index({ view }: HttpContextContract) {
    const users = await User.query().orderBy('id', 'desc')
    return view.render('dashboard/services/users/user', { users })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('dashboard/services/users/form-add-user')
  }

  public async store({ request, response, session }: HttpContextContract) {
    const payload = await request.validate(UserValidator)
    try {
      await User.create({
        ...payload,
        password: '123456',
      })

      session.flash({
        notification: {
          title: "Ajout de l'utilisateur réussie",
          type: 'success',
          message: 'Utilisateur ajouté avec succès',
        },
      })
      return response.redirect('/users/')
    } catch (e) {
      session.flash({
        notification: {
          title: "Ajout de l'utilisateur echoué",
          type: 'error',
          message:
            "Une erreur est survenue lors de l'ajout de l'agent, voici le message d'erreur :  " +
            e.message,
        },
      })
      return response.redirect('/users')
    }
  }

  public async show({}: HttpContextContract) {}

  public async edit({ view, params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    return view.render('dashboard/services/users/form-update-user', { user })
  }

  public async update({ request, response, params, session }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    const payload = await request.validate(UserUpdateValidator)
    try {
      await user
        .merge({
          ...payload,
        })
        .save()

      session.flash({
        notification: {
          title: "Modification de l'utilisateur réussie",
          type: 'success',
          message: 'Utilisateur modifié avec succès',
        },
      })

      return response.redirect('/users')
    } catch (e) {
      session.flash({
        notification: {
          title: "Modification de l'utilisateur échouée",
          type: 'danger',
          message:
            "Une erreur est survenue lors de la modification de l'utilisateur, voici le message d'erreur :  " +
            e.message,
        },
      })
      return response.redirect('/users')
    }
  }

  public async destroy({ params, session, response, auth }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    /**
     * * Check if the user is not the current user
     */
    if (user.id === auth.user?.id) {
      session.flash({
        notification: {
          title: "Suppression de l'utilisateur échouée",
          type: 'danger',
          message: 'Vous ne pouvez pas supprimer votre compte',
        },
      })
      return response.redirect().back()
    }
    try {
      await user.delete()
      session.flash({
        notification: {
          title: "Suppression de l'utilisateur réussie",
          type: 'success',
          message: 'Utilisateur supprimé avec succès',
        },
      })
      return response.redirect('/users')
    } catch (e) {
      session.flash({
        notification: {
          title: "Suppression de l'utilisateur échouée",
          type: 'danger',
          message:
            "L'utilisateur n'a pas pu être supprimé, voici le message d'erreur : " + e.message,
        },
      })
      return response.redirect().back()
    }
  }
}
