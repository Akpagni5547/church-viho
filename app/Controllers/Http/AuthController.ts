import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginValidator from 'App/Validators/LoginValidator'

export default class AuthController {
  public async index({ response }: HttpContextContract) {
    return response.redirect('/login')
  }

  public async loginPage({ view }: HttpContextContract) {
    return view.render('auth/login')
  }

  public async login({ request, auth, response, session }: HttpContextContract) {
    const { email, password } = await request.validate(LoginValidator)
    try {
      await auth.attempt(email, password)
      response.redirect('/dashboard')
    } catch (error) {
      session.flash('errors.current', "L'email ou le mot de passe est incorrect")
      return response.redirect().back()
    }
  }
  public async logout({ response, auth, session }: HttpContextContract) {
    await auth.logout()
    session.flash({
      notification: {
        title: 'Déconnexion',
        type: 'success',
        message: 'Vous êtes déconnecté',
      },
    })
    return response.redirect('/')
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
