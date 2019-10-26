'use strict';

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

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

Factory.blueprint('App/Models/User', faker => {
  return {
    name: faker.username(),
    email: faker.email(),
    password: faker.password(),
  };
});

Factory.blueprint('App/Models/Address', faker => {
  return {
    street: faker.sentece(),
    number: faker.integer(),
    ...data,
  };
});

Factory.blueprint('App/Models/Market', faker => {
  return {
    name: faker.username(),
    email: faker.email(),
    password: faker.password(),
  };
});

Factory.blueprint('App/Models/Category', faker => {
  return {
    name: faker.sentece(),
    min_choices: faker.float(),
    max_choices: faker.float(),
    price: faker.float(),
    ...data,
  };
});
