'use strict'

const Factory = use('Factory')

class OldHintsSeeder {

    static async run () {
        const tags = await Factory.model('App/Models/Hint').createMany(2)
        console.log('Seeded Hints')
	}

}

module.exports = OldHintsSeeder