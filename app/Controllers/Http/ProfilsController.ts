import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProfilValidator from 'App/Validators/ProfilValidator'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class ProfilsController {
  public async index({ view }: HttpContextContract) {
    return view.render('dashboard/services/profils/profils', { showpassword: false })
  }

  public async update({ auth, request, response, session }: HttpContextContract) {
    const agent = await User.findOrFail(auth.user?.id)
    const payload = await request.validate(ProfilValidator)
    try {
      await agent.merge(payload).save()
      session.flash({
        notification: {
          title: 'Modification de votre profil avec succès',
          type: 'success',
          message: 'Vous avez modifié votre profil avec succès',
        },
      })
      return response.redirect('/profils')
    } catch (e) {
      session.flash({
        notification: {
          title: 'Modification du profil a échoué',
          type: 'danger',
          message:
            'Une erreur est survenue lors de la modification de votre profil, veuillez réessayer plus tard. ',
        },
      })
      return response.redirect('/profils')
    }
  }

  public async updatePassword({ request, view, auth, session, response }: HttpContextContract) {
    const user = await User.findOrFail(auth.user?.id)
    const { currentPassword } = request.only(['currentPassword'])
    const validatePassword = schema.create({
      password: schema.string({ trim: true }, [rules.confirmed()]),
    })

    if (currentPassword) {
      if (await Hash.verify(user.password, currentPassword)) {
        session.flash({
          notification: {
            title: 'Mot de passe correct',
            type: 'success',
            message: 'Le mot de passe actuel est correct',
          },
        })
        return view.render('dashboard/services/profils/profils', { showpassword: true })
      } else {
        return view.render('dashboard/services/profils/profils', {
          showpassword: null,
          msg: 'Vous êtes trompé de mot de passe courant',
        })
      }
    } else {
      const payload = await request.validate({
        schema: validatePassword,
        messages: {
          required: 'Ce champ est obligatoire',
          confirmed: 'Les mots de passe ne sont pas identiques',
        },
      })
      try {
        await user.merge(payload).save()
        await auth.logout()
        session.flash({
          notification: {
            title: 'Mot de passe modifié',
            type: 'success',
            message: 'Votre mot de passe a été modifié avec succès. Essayez de vous reconnecter',
          },
        })
        return response.redirect('/')
      } catch (e) {
        session.flash({
          notification: {
            title: 'Erreur survenue',
            type: 'danger',
            message: 'Une erreur est survenue, veuillez réessayer plus tard',
          },
        })
        return response.redirect('back')
      }
    }
  }
}
