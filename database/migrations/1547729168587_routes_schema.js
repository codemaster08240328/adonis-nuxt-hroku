'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RoutesSchema extends Schema {
    up() {
        this.create('routes', table => {
            table.increments()
            table.string('title')
            table.integer('image_id').unsigned()
            table.foreign('image_id').references('attachments.id')

            table.timestamps()
        })
    }

    down() {
        this.drop('routes')
    }
}

module.exports = RoutesSchema
