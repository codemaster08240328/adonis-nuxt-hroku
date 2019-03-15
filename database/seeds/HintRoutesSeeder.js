'use strict'

// const Routes = use('App/Models/Route')
// const Hints = use('App/Models/Hint')
const HintRoute = use('App/Models/HintRoute')
const hrsd = require('../seed-data/HintRoutes')

const Factory = use('Factory')

class HintRoutesSeeder {

    static async run () {
        for (let hr of hrsd) {
            await HintRoute.create(hr)
        }
        console.log('Seeded pivot table for Routes and Hints')
    }

//    static async run () {

    	//need to CREATE entries to get an ID because of increments
    	//const hints = await Factory.model('App/Models/Hint').createMany(5);
    	//const route = await Routes.find(1)

	    //console.debug(route)



    	// for(let hint of hints) {
    	// 	await route.hints().attach(hint.id)
    	// }

   // }

}

module.exports = HintRoutesSeeder