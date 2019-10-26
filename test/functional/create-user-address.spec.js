'use strict';

const Factory = use('Factory');
const { test, trait } = use('Test/Suite')('Create User Address');

trait('Test/ApiClient');
trait('Auth/Client');

test('can create user address with valid data', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();

  const data = {
    street: 'Rua sei la o que',
    number: '90',
  };

  const response = await client
    .post(`/api/users/${user.id}/addresses`)
    .loginVia(user, 'user')
    .send(data)
    .end();

  response.assertStatus(201);
  response.assertJSONSubset({
    street: data.street,
    number: data.number,
  });
});

test("can't create user address with empty street", async ({
  assert,
  client,
}) => {
  const user = await Factory.model('App/Models/User').create();

  const data = {
    number: '90',
  };

  const response = await client
    .post(`/api/users/${user.id}/addresses`)
    .loginVia(user, 'user')
    .send(data)
    .end();

  response.assertStatus(400);
  response.assertJSONSubset([
    {
      message: 'street is required',
      field: 'street',
      validation: 'required',
    },
  ]);
});

test("can't create user address with empty number", async ({
  assert,
  client,
}) => {
  const user = await Factory.model('App/Models/User').create();

  const data = {
    street: 'Rua sei la o que',
  };

  const response = await client
    .post(`/api/users/${user.id}/addresses`)
    .loginVia(user, 'user')
    .send(data)
    .end();

  response.assertStatus(400);
  response.assertJSONSubset([
    {
      message: 'number is required',
      field: 'number',
      validation: 'required',
    },
  ]);
});

test("can't create user address if not authenticated", async ({
  assert,
  client,
}) => {
  const user = Factory.model('App/Models/User').create();

  const data = {
    street: 'Rua sei la o que',
    number: '90',
  };

  const response = await client
    .post(`/api/users/${user.id}/addresses`)
    .send(data)
    .end();

  response.assertStatus(401);
});
