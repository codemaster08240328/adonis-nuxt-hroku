'use strict'

const User = use('App/Models/User')

class UserController {
    async index() {
        console.log('index')
        return await User.all()
    }

    async show({ request, response, params: { id } }) {
        const user = request.post().user

        response.status(200).json({
            success: true,
            data: user
        })
    }

    async store({ request }) {
        return await User.create(request.post())
    }

    async update({ params, request }) {
        return await User.query()
            .where({ id: params.id })
            .update(request.post())
    }

    async destroy({ params }) {
        return await User.query()
            .where({ id: params.id })
            .delete()
    }
}

module.exports = UserController
