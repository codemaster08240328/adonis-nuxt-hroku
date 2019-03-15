'use strict'

const Env = use('Env')
const Config = use('Config')
const { Nuxt, Builder } = require('nuxt')
const Task = use('App/Models/Task')

class PostController {
    constructor() {
        const config = Config.get('nuxt')
        config.dev = Env.get('NODE_ENV') === 'development'
        this.nuxt = new Nuxt(config)
        // Start build process (only in development)
        if (config.dev) {
            new Builder(this.nuxt).build()
        }
    }

    async index({ view }) {
        const tasks = await Task.all()

        return view.render('posts.index', { tasks: tasks.toJSON() })
    }

    async render({ request: { request: req }, response: { response: res } }) {
        await new Promise((resolve, reject) => {
            this.nuxt.render(req, res, promise => {
                promise.then(resolve).catch(reject)
            })
        })
    }
}

module.exports = new PostController()
