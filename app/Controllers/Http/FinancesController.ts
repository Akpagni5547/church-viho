import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Finance from 'App/Models/Finance'
import FinanceStoreValidator from '../../Validators/FinanceStoreValidator'
import Configuration from '../../Models/Configuration'
import { FinancesType } from 'App/Enums/finances'

export default class FinancesController {
  public async index({ view }: HttpContextContract) {
    const finances = await Finance.all()
    const solde = await Configuration.firstOrFail()

    const totalEntries = await Finance.query()
      .andWhere('type_finance', FinancesType.ENTREE)
      .groupBy('type_finance')
      .sum('amount', 'cout')

    const totalSorties = await Finance.query()
      .andWhere('type_finance', FinancesType.SORTIE)
      .groupBy('type_finance')
      .sum('amount', 'cout')

    return view.render('dashboard/services/finances/finances', {
      finances,
      solde,
      totalEntries,
      totalSorties,
      financesTotal: [
        totalEntries.length === 0 ? 0.0001 : totalEntries[0]['$extras'].cout,
        totalSorties.length === 0 ? 0.0001 : totalSorties[0]['$extras'].cout,
      ],
    })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('dashboard/services/finances/add-finance')
  }

  public async store({ request, response, session, auth }: HttpContextContract) {
    const payload = await request.validate(FinanceStoreValidator)
    const solde = await Configuration.firstOrFail()
    if (payload.type_finance === FinancesType.SORTIE && solde.solde - payload.amount < 0) {
      session.flash({
        notification: {
          title: 'Ajout echoué',
          type: 'danger',
          message: 'Impossible de faire cette sortie car votre solde est insuffisant',
        },
      })
      return response.redirect('/finances/')
    }
    await Finance.create({
      ...payload,
      userDoIt: auth.user!.id,
    })
    await solde
      .merge({
        solde:
          payload.type_finance === FinancesType.ENTREE
            ? solde.solde + payload.amount
            : solde.solde - payload.amount,
      })
      .save()

    session.flash({
      notification: {
        type: 'success',
        title: "Ajout d'une entree/sortie",
        message: 'Votre entree/sortie a été ajouté avec succes',
      },
    })
    return response.redirect('/finances/')
  }
}
