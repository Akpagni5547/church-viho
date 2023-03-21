import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StatutAppel } from 'App/Enums/statut_appel'
import Fidele from 'App/Models/Fidele'
import ListCall from 'App/Models/ListCall'

export default class ListCallsController {
  public async makePresent({ response, params, auth, session }: HttpContextContract) {
    try {
      const calledExist = await ListCall.query()
        .where('fidele_id', '=', params.id)
        .andWhereBetween('date_called', [
          new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
          new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1),
        ])
      if (calledExist.length > 0) {
        session.flash({
          notification: {
            title: 'Appel echoué',
            type: 'danger',
            message: "L'appel n'a pas pu être effectué car ce fidèle a déjà été appelé aujourd'hui",
          },
        })
        return response.redirect().back()
      }
      await ListCall.create({
        user_called: auth.user!.id,
        status: StatutAppel.PRESENT,
        fidele_id: params.id,
        dateCalled: new Date(),
      })
      session.flash({
        notification: {
          title: 'Appel réussie',
          type: 'success',
          message: "L'appel a été effectué avec succès",
        },
      })
    } catch (e) {
      console.log(e)

      session.flash({
        notification: {
          title: 'Appel echoué',
          type: 'danger',
          message: "L'appel n'a pas pu être effectué",
        },
      })
    }
    return response.redirect().back()
  }

  public async makeAbsent({ response, params, auth, session }: HttpContextContract) {
    try {
      const calledExist = await ListCall.query()
        .where('fidele_id', '=', params.id)
        .andWhereBetween('date_called', [
          new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
          new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1),
        ])
      if (calledExist.length > 0) {
        session.flash({
          notification: {
            title: 'Appel echoué',
            type: 'danger',
            message: "L'appel n'a pas pu être effectué car ce fidèle a déjà été appelé aujourd'hui",
          },
        })
        return response.redirect().back()
      }
      const fidele = await Fidele.findOrFail(params.id)
      await ListCall.create({
        user_called: auth.user!.id,
        status: StatutAppel.ABSENT,
        fidele_id: params.id,
        dateCalled: new Date(),
      })
      await fidele
        .merge({
          count_missing: fidele.count_missing + 1,
        })
        .save()
      session.flash({
        notification: {
          title: 'Appel réussie',
          type: 'success',
          message: "L'appel a été effectué avec succès",
        },
      })
    } catch (e) {
      session.flash({
        notification: {
          title: 'Appel echoué',
          type: 'danger',
          message: "L'appel n'a pas pu être effectué",
        },
      })
    }
    return response.redirect().back()
  }
}
