'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const DrivingSchool = use('App/Models/DrivingSchool')

class FindDrivingSchool {
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
        const ds = await DrivingSchool.find(id)

        if (!ds) {
            return response.status(404).json({
                success: false,
                message: 'DrivingSchool not found.',
                id
            })
        }

        request.body.ds = ds

        await next()
    }
}

module.exports = FindDrivingSchool
