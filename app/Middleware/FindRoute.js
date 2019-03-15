'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Route = use('App/Models/Route')

class FindRoute {
    /**
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Function} next
     */
    async handle(
        {
            request,
            resposne,
            params: { id }
        },
        next
    ) {
        const route = await Route.find(id)

        if (!route) {
            return response.status(404).json({
                success: false,
                message: 'Route not found.',
                id
            })
        }

        request.body.route = route

        await next()
    }
}

module.exports = FindRoute
