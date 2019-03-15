'use strict'

const DrivingSchool = use('App/Models/DrivingSchool')

const drivingSchoolsSeedData = require('../seed-data/DrivingSchools')

class DrivingSchoolsSeeder {

    static async run () {
		for (let drivingSchool of drivingSchoolsSeedData) {
			await DrivingSchool.create(drivingSchool)
		}
		console.log('Seeded Driving Schools')
	}

}

module.exports = DrivingSchoolsSeeder