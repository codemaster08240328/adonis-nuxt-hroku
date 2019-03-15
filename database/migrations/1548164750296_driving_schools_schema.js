'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DrivingSchoolsSchema extends Schema {
    up() {
        this.create('driving_schools', table => {
            table.increments()
            table.string('title')
            table.string('city')
            table.string('zip')
            table.string('address')
            table.timestamps()
        })
    }

    down() {
        this.drop('driving_schools')
    }
}

module.exports = DrivingSchoolsSchema
