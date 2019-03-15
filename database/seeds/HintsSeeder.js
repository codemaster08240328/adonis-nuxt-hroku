'use strict'

const Hint = use('App/Models/Hint')
const hsd = require('../seed-data/Hints')

/*
|--------------------------------------------------------------------------
| HintSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class HintsSeeder {
  static async run () {
    for(let h of hsd) {
      await Hint.create(h)
    }

    console.debug('Seeded Hints')
  }
}

module.exports = HintsSeeder