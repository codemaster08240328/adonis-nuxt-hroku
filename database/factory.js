'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

// const Factory = use('Factory')

/**
  Factory.blueprint('App/Models/User', (faker) => {
    return {
      username: faker.username()
    }
  })
*/

const Factory = use('Factory')

// Factory.blueprint('App/Models/User', (faker, index, data) => {
//   const defaultValue = {
//     username: faker.username(),
//     email: faker.email(),
//     password: 'secret',
//   }
//
//   return Object.assign(defaultValue, data)
// })

// Factory.blueprint('App/Models/Post', (faker) => {
//   return {
//     title: faker.sentence(),
//     body: faker.paragraph(),
//     user_id: async () => {
//       return (await Factory.model('App/Models/User').create()).id
//     }
//   }
// })



Factory.blueprint('App/Models/Hint', faker => {
    return {
        title: faker.word(),
        primaryImage: 'https://picsum.photos/300/200',
        geometry: '12.123091823,17.123123',
        description: faker.sentence(),
        icon: 'icon.svg'
    }
})

Factory.blueprint('App/Models/Route', faker => {
    return {
        title: faker.word(),
        primaryImage: 'https://picsum.photos/300/200',
        geometry: '16.154870,47.533000'
    }
})

Factory.blueprint('App/Models/RouteGeo', async(faker,i,data) => {
    return {
        geometry: data.geometry,
        route_id: faker.integer({min:1,max:3})
    }
})
