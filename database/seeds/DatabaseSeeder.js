'use strict';

const RoutesSeeder = require('./RoutesSeeder')
const HintsSeeder = require('./HintsSeeder')
const HintRoutesSeeder = require('./HintRoutesSeeder')
const RouteGeosSeeder = require('./RouteGeosSeeder')
const UsersSeeder = require('./UsersSeeder')
const DrivingSchoolsSeeder = require('./DrivingSchoolsSeeder')
const AttachmentsSeeder = require('./AttachmentsSeeder')

class DatabaseSeeder {
    async run() {
        await AttachmentsSeeder.run()

        await UsersSeeder.run()
        await DrivingSchoolsSeeder.run()
        await RoutesSeeder.run()
        await HintsSeeder.run()
        await HintRoutesSeeder.run()
        await RouteGeosSeeder.run()
    }
}

module.exports = DatabaseSeeder