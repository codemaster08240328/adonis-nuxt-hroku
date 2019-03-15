'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route')

Route.group(() => {
    Route.resource('users', 'UserController')
        .apiOnly()
        .middleware(
            new Map([
                [['users.show'], ['auth', 'findUser']],
                [['users.destroy'], ['auth', 'findUser']]
            ])
        )

    Route.resource('routes', 'RouteController')
        .apiOnly()
        .middleware(new Map([[['routes.show'], ['findRoute']]]))

    Route.resource('drivingschools', 'DrivingSchoolController')
        .apiOnly()
        .middleware(new Map([[['drivingschools.show'], ['findDrivingSchool']]]))

    Route.post('/login', 'AuthController.login')
}).prefix('api/v1')

//Route.get('fahrschulen/:city/@:latlong', 'NuxtController.render')
//Route.get('fahrschulen/:city', 'NuxtController.render')
//Route.get('/test', () => 'Hello Adonis')
//Route.get('posts', 'PostController.render')

Route.any('*', 'NuxtController.render')
