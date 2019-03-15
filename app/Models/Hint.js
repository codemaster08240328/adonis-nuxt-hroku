'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Hint extends Model {
    routes() {
        return this.belongsToMany(
            'App/Models/Route',
            'hint_id',
            'route_id',
            'id',
            'id'
        )
    }

    image() {
        return this.hasOne('App/Models/Attachment', 'image_id', 'id')
    }
}

module.exports = Hint
