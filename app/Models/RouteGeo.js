'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class RouteGeo extends Model {
    route() {
        return this.belongsTo('App/Models/Route')
    }
}

module.exports = RouteGeo
