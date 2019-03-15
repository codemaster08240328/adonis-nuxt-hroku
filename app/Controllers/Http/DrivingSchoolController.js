'use strict'

const DrivingSchool = use('App/Models/DrivingSchool')

class DrivingSchoolController {
    async index({ response }) {
        const ds = await DrivingSchool.all()
        response.status(200).json({
            success: true,
            message: 'Here is your route.',
            data: ds
        })
    }

    async show({ request, response, params: { id } }) {
        const drivingSchool = request.post().ds

        response.status(200).json({
            success: true,
            message: 'Here is your drivingSchool',
            data: drivingSchool
        })
    }
}

module.exports = DrivingSchoolController
