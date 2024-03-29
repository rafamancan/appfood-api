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
    street: faker.sentence({ words: 3 }),
    number: faker.integer({ min: 0, max: 60 }),
  };
});

Factory.blueprint('App/Models/Market', faker => {
  return {
    name: faker.username(),
    email: faker.email(),
    password: faker.password(),
  };
});

Factory.blueprint('App/Models/Order', faker => {
  return {
    obs: faker.sentence({ words: 5 }),
    total: faker.floating({ min: 0, max: 60 }),
    status: 'pedido_feito',
  };
});

Factory.blueprint('App/Models/Category', faker => {
  return {
    name: faker.sentence({ words: 2 }),
    min_choices: faker.integer({ min: 1, max: 3 }),
    max_choices: faker.integer({ min: 3, max: 5 }),
    price: faker.floating({ min: 0, max: 60 }),
  };
});

Factory.blueprint('App/Models/Product', faker => {
  return {
    name: faker.sentence({ words: 2 }),
    price: faker.floating({ min: 0, max: 60 }),
  };
});

Factory.blueprint('App/Models/Item', faker => {
  return {
    obs: faker.sentence({ words: 2 }),
    total: faker.floating({ min: 0, max: 60 }),
  };
});
