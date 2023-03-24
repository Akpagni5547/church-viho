import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EventStoreValidator from '../../Validators/EventStoreValidator'
import Event from 'App/Models/Event'
import EventUpdateValidator from 'App/Validators/EventUpdateValidator'

export default class EventsController {
  public async index({ view }: HttpContextContract) {
    const events = await Event.all()
    return view.render('dashboard/services/evenement/event', { events })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('dashboard/services/evenement/add-event')
  }

  public async store({ response, request, session }: HttpContextContract) {
    const payload = await request.validate(EventStoreValidator)
    try {
      await Event.create({
        ...payload,
        eventDate: new Date(payload.event_date.toLocal().toString()),
      })

      session.flash({
        notification: {
          title: "Ajout de l'évènement réussie",
          type: 'success',
          message: 'Evènement ajouté avec succès',
        },
      })
      return response.redirect('/events/')
    } catch (e) {
      session.flash({
        notification: {
          title: "Ajout de l'évènement echoué",
          type: 'danger',
          message:
            "Une erreur est survenue lors de l'ajout de l'évènement, voici le message d'erreur :  " +
            e.message,
        },
      })
      return response.redirect('/events')
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const event = await Event.findOrFail(params.id)
      return response.ok({ event })
    } catch (error) {
      response.badRequest({
        error,
      })
    }
  }

  public async edit({ view, params }: HttpContextContract) {
    const event = await Event.findOrFail(params.id)
    return view.render('dashboard/services/evenement/edit-event', { event })
  }

  public async update({ params, request, session, response }: HttpContextContract) {
    const event = await Event.findOrFail(params.id)
    const payload = await request.validate(EventUpdateValidator)
    try {
      await event
        .merge({
          ...payload,
          eventDate: payload.event_date
            ? new Date(payload.event_date.toLocal().toString())
            : event.eventDate,
        })
        .save()

      session.flash({
        notification: {
          title: "Modification de l'évènement réussie",
          type: 'success',
          message: 'Evènement modifié avec succès',
        },
      })
      return response.redirect('/events/')
    } catch (e) {
      session.flash({
        notification: {
          title: "Modification de l'évènement echoué",
          type: 'danger',
          message:
            "Une erreur est survenue lors de la modification de l'évènement, voici le message d'erreur :  " +
            e.message,
        },
      })
      return response.redirect('/events')
    }
  }

  public async destroy({}: HttpContextContract) {}
}
