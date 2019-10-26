'use strict';

const Factory = use('Factory');
const { test, trait } = use('Test/Suite')('Create Market Category');

trait('Test/ApiClient');
trait('Auth/Client');

test('can create market category with valid data', async ({
  assert,
  client,
}) => {
  const market = await Factory.model('App/Models/Market').create();

  const data = {
    name: 'Pizza Broto',
    min_choices: 1,
    max_choices: 8,
    price: 25.0,
  };

  const response = await client
    .post(`/api/markets/${market.id}/categories`)
    .loginVia(market, 'market')
    .send(data)
    .end();

  response.assertStatus(201);
  response.assertJSONSubset({
    name: data.name,
    min_choices: data.min_choices,
    max_choices: data.max_choices,
    price: data.price,
  });
});

test("can't create market category with empty name", async ({
  assert,
  client,
}) => {
  const market = await Factory.model('App/Models/Market').create();

  const data = {
    min_choices: 1,
    max_choices: 8,
    price: 25.0,
  };

  const response = await client
    .post(`/api/markets/${market.id}/categories`)
    .loginVia(market, 'market')
    .send(data)
    .end();

  response.assertStatus(400);
  response.assertJSONSubset([
    {
      message: 'name is required',
      field: 'name',
      validation: 'required',
    },
  ]);
});

test("can't create market category if not authenticated", async ({
  assert,
  client,
}) => {
  const market = Factory.model('App/Models/Market').create();

  const data = {
    name: 'Pizza Broto',
    min_choices: 1,
    max_choices: 8,
    price: 25.0,
  };

  const response = await client
    .post(`/api/markets/${market.id}/categories`)
    .send(data)
    .end();

  response.assertStatus(401);
});
