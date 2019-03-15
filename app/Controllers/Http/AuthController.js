'use strict'

const User = use('App/Models/User')

class AuthController {
    async login({ request, auth, response }) {
        const { email_address, password } = request.all()
        try {
            if (await auth.attempt(email_address, password)) {
                let user = await User.findBy('email_address', email_address)
                let accessToken = await auth.generate(user)
                return response.json({
                    success: true,
                    data: user,
                    access_token: accessToken
                })
            }
        } catch (e) {
            return response.status(404).json({
                success: false,
                message: 'User Not Found'
            })
        }
    }
}

module.exports = AuthController
