'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AttachmentsSchema extends Schema {
    up() {
        this.create('attachments', table => {
            table.increments()
            table.string('url')
            table.timestamps()
        })
    }

    down() {
        this.drop('attachments')
    }
}

module.exports = AttachmentsSchema
