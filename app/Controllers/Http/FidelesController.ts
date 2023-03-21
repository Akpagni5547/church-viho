import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Fidele from 'App/Models/Fidele'
import FideleAddValidator from 'App/Validators/FideleAddValidator'

export default class FidelesController {
  public async index({ view }: HttpContextContract) {
    const fideles = await Fidele.query()
      .orderBy('updated_at', 'asc')
      .preload('listCalled', (listCalled) => {
        listCalled.whereBetween('date_called', [
          new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
          new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1),
        ])
      })
    // console.log(fideles)
    const totalBaptise = fideles.filter((fidele) => fidele.is_baptise === true).length
    const totalFidele = Object.keys(fideles).length

    return view.render('dashboard/services/fidele/fidele', {
      fideles,
      totalBaptise,
      totalNonBaptise: totalFidele - totalBaptise,
      totalFidele,
    })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('dashboard/services/fidele/form-add-fidele')
  }

  public async store({ request, response, session }: HttpContextContract) {
    const payload = await request.validate(FideleAddValidator)
    try {
      await Fidele.create({
        ...payload,
        date_of_birth: new Date(payload.date_of_birth.toLocal().toString()),
      })

      session.flash({
        notification: {
          title: 'Ajout du fidele réussie',
          type: 'success',
          message: 'Fidele ajouté avec succès',
        },
      })
      return response.redirect('/fideles/')
    } catch (e) {
      session.flash({
        notification: {
          title: 'Ajout du fidele echoué',
          type: 'danger',
          message:
            "Une erreur est survenue lors de l'ajout du fidle, voici le message d'erreur :  " +
            e.message,
        },
      })
      return response.redirect('/fideles')
    }
  }

  public async show({}: HttpContextContract) {}

  public async edit({ view, params }: HttpContextContract) {
    const fidele = await Fidele.findOrFail(params.id)
    return view.render('dashboard/services/fidele/form-update-fidele', { fidele })
  }

  public async update({ params, request, session, response }: HttpContextContract) {
    const fidele = await Fidele.findOrFail(params.id)
    const payload = await request.validate(FideleAddValidator)
    try {
      await fidele
        .merge({
          ...payload,
          date_of_birth: payload.date_of_birth
            ? new Date(payload.date_of_birth.toLocal().toString())
            : fidele.date_of_birth,
        })
        .save()

      session.flash({
        notification: {
          title: 'Modification du fidele réussie',
          type: 'success',
          message: 'Fidele modifié avec succès',
        },
      })
      return response.redirect('/fideles/')
    } catch (e) {
      session.flash({
        notification: {
          title: 'Modification du fidele echoué',
          type: 'danger',
          message:
            "Une erreur est survenue lors de la modification du fidle, voici le message d'erreur :  " +
            e.message,
        },
      })
      return response.redirect('/fideles')
    }
  }

  public async destroy({ params, response, session }: HttpContextContract) {
    const fidele = await Fidele.findOrFail(params.id)
    try {
      await fidele.delete()
      session.flash({
        notification: {
          title: 'Suppression du fidèle réussie',
          type: 'success',
          message: 'Fidèle supprimé avec succès',
        },
      })
      return response.redirect('/fideles')
    } catch (e) {
      session.flash({
        notification: {
          title: 'Suppression du fidèle échouée',
          type: 'danger',
          message: "Le fidèle n'a pas pu être supprimé, voici le message d'erreur : " + e.message,
        },
      })
      return response.redirect().back()
    }
  }
}
