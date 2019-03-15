'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RouteGeoSchema extends Schema {
    up() {
        this.create('route_geos', table => {
            table.increments()
            table.json('geometry')
            table.integer('route_id').unsigned()
            table
                .foreign('route_id')
                .references('routes.id')
                .onDelete('cascade')
            table.timestamps()
        })
    }

    down() {
        this.drop('route_geos')
    }
}

module.exports = RouteGeoSchema
