'use strict'

const Route = use('App/Models/Route')

class RouteController {
    async index({ response }) {
        const routes = await Route.all()
        response.status(200).json({
            success: true,
            message: 'Here is your route.',
            data: routes
        })
    }

    async show({ request, response, params: { id } }) {
        const { route } = request.post()

        //const hints = await route.hints().fetch().load('image')
        // const hints = route.load('hints').with('image')
        // const geos = await route.geos().fetch()

        //await route.loadMany(['hints','geos'])

        await route.loadMany({
            geos: null,
            hints: builder => builder.with('image')
        })

        // route.hints = hints
        // route.geos = geos

        response.status(200).json({
            success: true,
            message: 'Here is your route.',
            data: route
        })
    }
}

module.exports = RouteController
