'use strict'

const At = use('App/Models/Attachment')

const atsd = require('../seed-data/Attachment')

/*
|--------------------------------------------------------------------------
| AttachmentSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

class AttachmentsSeeder {

    static async run () {
        for (let at of atsd) {
            await At.create(at)
        }
        console.log('Seeded Attachment')
    }
}

module.exports = AttachmentsSeeder
