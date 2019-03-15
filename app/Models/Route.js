'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Route extends Model {
    hints() {
        return this.belongsToMany(
            'App/Models/Hint',
            'route_id',
            'hint_id',
            'id',
            'id'
        ).pivotTable('hint_routes')
    }

    geos() {
        return this.hasMany('App/Models/RouteGeo')
    }

    image() {
        return this.hasOne('App/Models/Attachment', 'id', 'image_id')
    }
}

module.exports = Route
