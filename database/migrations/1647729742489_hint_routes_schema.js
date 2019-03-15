'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RoutesHintsSchema extends Schema {
    up() {
        this.create('hint_routes', table => {
            table.increments()
            table
                .integer('route_id')
                .unsigned()
                .index('route_id')
            table
                .foreign('route_id')
                .references('routes.id')
                .onDelete('cascade')
            table
                .integer('hint_id')
                .unsigned()
                .index('hint_id')
            table.integer('order').unsigned()
            table
                .foreign('hint_id')
                .references('hints.id')
                .onDelete('cascade')
            table.timestamps()
        })
    }

    down() {
        this.drop('hint_routes')
    }
}

module.exports = RoutesHintsSchema
