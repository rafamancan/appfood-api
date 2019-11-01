'use strict';

const Factory = use('Factory');
const { test, trait } = use('Test/Suite')('Create Item Product');

trait('Test/ApiClient');
trait('Auth/Client');

test('can create item product with valid data', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();
  const order = await Factory.model('App/Models/Order').make();
  await user.orders().save(order);
  const item = await Factory.model('App/Models/Item').make();
  await order.items().save(item);

  const market = await Factory.model('App/Models/Market').create();
  const category = await Factory.model('App/Models/Category').make();
  await market.categories().save(category);
  const product = await Factory.model('App/Models/Product').make();
  await category.products().save(product);

  const data = {
    obs: 'Observacao teste...',
  };
  const response = await client
    .post(
      `api/v1/users/${user.id}/orders/${order.id}/items/${item.id}/products/${product.id}`
    )
    .loginVia(user, 'user')
    .send(data)
    .end();

  response.assertStatus(201);
  response.assertJSONSubset({
    obs: data.obs,
  });
});

test("can't create item product without authenticated user", async ({
  assert,
  client,
}) => {
  const user = await Factory.model('App/Models/User').create();
  const order = await Factory.model('App/Models/Order').make();
  await user.orders().save(order);
  const item = await Factory.model('App/Models/Item').make();
  await order.items().save(item);

  const market = await Factory.model('App/Models/Market').create();
  const category = await Factory.model('App/Models/Category').make();
  await market.categories().save(category);
  const product = await Factory.model('App/Models/Product').make();
  await category.products().save(product);

  const data = {
    obs: 'Observacao teste...',
  };
  const response = await client
    .post(
      `api/v1/users/${user.id}/orders/${order.id}/items/${item.id}/products/${product.id}`
    )
    .send(data)
    .end();

  response.assertStatus(401);
});

test("can't create item product with invalid order", async ({
  assert,
  client,
}) => {
  const user = await Factory.model('App/Models/User').create();
  const order = await Factory.model('App/Models/Order').make();
  await user.orders().save(order);
  const item = await Factory.model('App/Models/Item').make();
  await order.items().save(item);

  const market = await Factory.model('App/Models/Market').create();
  const category = await Factory.model('App/Models/Category').make();
  await market.categories().save(category);
  const product = await Factory.model('App/Models/Product').make();
  await category.products().save(product);

  const data = {
    obs: 'Observacao teste...',
  };
  const response = await client
    .post(
      `api/v1/users/${user.id}/orders/9999/items/${item.id}/products/${product.id}`
    )
    .loginVia(user, 'user')
    .send(data)
    .end();

  response.assertStatus(400);
  response.assertJSONSubset([{ error: 'Order not found' }]);
});

test("can't create item product with invalid item", async ({
  assert,
  client,
}) => {
  const user = await Factory.model('App/Models/User').create();
  const order = await Factory.model('App/Models/Order').make();
  await user.orders().save(order);
  const item = await Factory.model('App/Models/Item').make();
  await order.items().save(item);

  const market = await Factory.model('App/Models/Market').create();
  const category = await Factory.model('App/Models/Category').make();
  await market.categories().save(category);
  const product = await Factory.model('App/Models/Product').make();
  await category.products().save(product);

  const data = {
    obs: 'Observacao teste...',
  };
  const response = await client
    .post(
      `api/v1/users/${user.id}/orders/${order.id}/items/9999/products/${product.id}`
    )
    .loginVia(user, 'user')
    .send(data)
    .end();

  response.assertStatus(400);
  response.assertJSONSubset([{ error: 'Item not found' }]);
});

test("can't create item product with invalid product", async ({
  assert,
  client,
}) => {
  const user = await Factory.model('App/Models/User').create();
  const order = await Factory.model('App/Models/Order').make();
  await user.orders().save(order);
  const item = await Factory.model('App/Models/Item').make();
  await order.items().save(item);

  const market = await Factory.model('App/Models/Market').create();
  const category = await Factory.model('App/Models/Category').make();
  await market.categories().save(category);
  const product = await Factory.model('App/Models/Product').make();
  await category.products().save(product);

  const data = {
    obs: 'Observacao teste...',
  };
  const response = await client
    .post(
      `api/v1/users/${user.id}/orders/${order.id}/items/${item.id}/products/99999`
    )
    .loginVia(user, 'user')
    .send(data)
    .end();

  response.assertStatus(400);
  response.assertJSONSubset([{ error: 'Product not found' }]);
});
