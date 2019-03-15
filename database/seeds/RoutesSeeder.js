'use strict'

const Route = use('App/Models/Route')

const routesSeedData = require('../seed-data/Routes')

class RoutesSeeder {

    static async run () {
        for (let route of routesSeedData) {
            await Route.create(route)
        }
        console.log('Seeded Routes')
    }

}

module.exports = RoutesSeeder