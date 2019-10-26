'use strict';

const Factory = use('Factory');
const { test, trait } = use('Test/Suite')('Create Market');

trait('Test/ApiClient');
trait('Auth/Client');

test('can create market with valid data', async ({ assert, client }) => {
  const data = {
    name: 'O Pizzaiolo',
    email: 'rafael.mancan@gmail.com',
    password: '12345',
  };

  const response = await client
    .post('/api/v1/markets')
    .send(data)
    .end();

  response.assertStatus(201);
  response.assertJSONSubset({
    name: data.name,
    email: data.email,
  });
});

test("can't create market with invalid email", async ({ assert, client }) => {
  const data = {
    name: 'Rafael Mancan',
    email: 'rafael.mancan',
    password: '12345',
  };

  const response = await client
    .post('/api/v1/markets')
    .send(data)
    .end();

  response.assertStatus(400);
  response.assertJSONSubset([
    {
      message: 'email validation failed on email',
      field: 'email',
      validation: 'email',
    },
  ]);
});

test("can't create market when email already in use", async ({
  assert,
  client,
}) => {
  const data = {
    name: 'Rafael Mancan',
    email: 'rafael.mancan@gmail.com',
    password: '12345',
  };

  const response = await client
    .post('/api/v1/markets')
    .send(data)
    .end();

  response.assertStatus(400);
  response.assertJSONSubset([
    {
      message: 'unique validation failed on email',
      validation: 'unique',
    },
  ]);
});
