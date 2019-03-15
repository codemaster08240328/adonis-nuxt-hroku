'use strict'


const route1 = require('../seed-data/geojson/ds1/01_feistritz.geojson')
const route2 = require('../seed-data/geojson/ds1/02_petersbaumgarten.geojson')
const route3 = require('../seed-data/geojson/ds1/03_zeobern_autobahn.geojson')
const route4 = require('../seed-data/geojson/ds1/04_olbersdorf.geojson')
const route5 = require('../seed-data/geojson/ds1/05_moenichkirchen.geojson')


const axios = use('axios')
const Factory = use('Factory')
const RouteGeo = use('App/Models/RouteGeo')
const Routes = use('App/Models/Route')



class RouteGeosSeeder {

    static async run () {
        //const geojson = await axios.get('http://localhost:3000/geojson/tracks.json')
        //console.debug(geojson.data)
        //await Factory.model('App/Models/RouteGeo').create({geometry:JSON.stringify(geojson.data)})

        let routes = [
            route1,
            route2,
            route3,
            route4,
            route5
        ]

        const routeGeo = new RouteGeo();

        for (var i = 0; i < routes.length; i++) {
            await RouteGeo.create({
                geometry: JSON.stringify(routes[i]),
                route_id: i+1
            })
        }

        //route.geos().attach(    )
        //const geo = await Factory.model('App/Models/RouteGeo').make()

        // https://adonisjs.com/docs/4.0/relationships#_has_many
        // routeGeo.route_id = 1,
        // routeGeo.geometry = JSON.stringify(employee)
        //
        // await route.geos().save(routeGeo)

        // await route.geos().save(geo)
        //
        //
        // await RouteGeo.create({
        //     route_id:1,
        //     geometry:JSON.stringify(employee)
        // })
        // await RouteGeo.create({
        //     route_id:1,
        //     geometry:JSON.stringify(geojson.data)
        // })
        // await RouteGeo.create({
        //     route_id:2,
        //     geometry:JSON.stringify(geojson.data)
        // })

        console.log('Seeded RouteGeo Table')
    }
}

module.exports = RouteGeosSeeder