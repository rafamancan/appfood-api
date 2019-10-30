'use strict';

const Factory = use('Factory');
const { test, trait } = use('Test/Suite')('Create Order Items');

trait('Test/ApiClient');
trait('Auth/Client');

test('can create order items with valid data', async ({ assert, client }) => {
  const category = await Factory.model('App/Models/Category').create();
  const user = await Factory.model('App/Models/User').create();
  const order = await Factory.model('App/Models/Order').create();

  const data = {
    order_id: order.id,
    category_id: category.id,
  };

  const response = await client
    .post(`/api/v1/users/${user.id}/orders/${order.id}/items`)
    .loginVia(user, 'user')
    .send(data)
    .end();
  response.assertStatus(201);
});

test("can't create order items without authenticated", async ({
  assert,
  client,
}) => {
  const category = await Factory.model('App/Models/Category').create();
  const user = await Factory.model('App/Models/User').create();
  const order = await Factory.model('App/Models/Order').create();

  const data = {
    order_id: order.id,
    category_id: category.id,
  };

  const response = await client
    .post(`/api/v1/users/${user.id}/orders/${order.id}/items`)
    .send(data)
    .end();
  response.assertStatus(401);
});

test("can't create order items with invalid order", async ({
  assert,
  client,
}) => {
  const category = await Factory.model('App/Models/Category').create();
  const user = await Factory.model('App/Models/User').create();

  const data = {
    category_id: category.id,
    order_id: 9999,
  };

  const response = await client
    .post(`/api/v1/users/${user.id}/orders/${data.order_id}/items`)
    .loginVia(user, 'user')
    .send(data)
    .end();

  response.assertStatus(400);
  response.assertJSONSubset([
    {
      error: 'Order not found',
    },
  ]);
});

test("can't create order items without valid category", async ({
  assert,
  client,
}) => {
  const user = await Factory.model('App/Models/User').create();
  const order = await Factory.model('App/Models/Order').create();

  const data = {
    order_id: order.id,
    category_id: 999,
  };

  const response = await client
    .post(`/api/v1/users/${user.id}/orders/${order.id}/items`)
    .loginVia(user, 'user')
    .send(data)
    .end();

  response.assertStatus(400);
  response.assertJSONSubset([
    {
      error: 'Category not found',
    },
  ]);
});
