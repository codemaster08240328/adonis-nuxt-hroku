'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HintsSchema extends Schema {
    up() {
        this.create('hints', table => {
            table.increments()
            table.string('title')
            table.integer('image_id').unsigned()
            table.foreign('image_id').references('attachments.id')
            table.string('geometry')
            table.text('description')
            table.integer('icon_id').unsigned()
            table.integer('order').unsigned()
            table.timestamps()
        })
    }

    down() {
        this.drop('hints')
    }
}

module.exports = HintsSchema
