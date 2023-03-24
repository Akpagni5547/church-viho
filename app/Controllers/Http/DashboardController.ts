import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from 'App/Models/Event'

export default class DashboardController {
  public async index({ view }: HttpContextContract) {
    const events = await Event.query().orderBy('id', 'desc').limit(10)
    return view.render('dashboard/services/dashboard', { events })
  }
}
