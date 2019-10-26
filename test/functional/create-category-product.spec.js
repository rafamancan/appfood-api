'use strict';

const Factory = use('Factory');
const { test, trait } = use('Test/Suite')('Create Category Product');

trait('Test/ApiClient');
trait('Auth/Client');

test('can create product category with valid data', async ({
  assert,
  client,
}) => {
  const market = await Factory.model('App/Models/Market').create();
  const category = await Factory.model('App/Models/Category').make();
  await market.categories().save(category);

  const data = {
    name: 'File',
    price: 25.3,
  };

  const response = await client
    .post(`api/v1/markets/${market.id}/categories/${category.id}/products`)
    .loginVia(market, 'market')
    .send(data)
    .end();

  response.assertStatus(201);
  response.assertJSONSubset({
    name: data.name,
    price: data.price,
  });
});

test("can't create product category with empty name", async ({
  assert,
  client,
}) => {
  const market = await Factory.model('App/Models/Market').create();
  const category = await Factory.model('App/Models/Category').make();
  await market.categories().save(category);

  const data = {
    price: 25.3,
  };

  const response = await client
    .post(`api/v1/markets/${market.id}/categories/${category.id}/products`)
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

test("can't create product category if not authenticated", async ({
  assert,
  client,
}) => {
  const market = await Factory.model('App/Models/Market').create();
  const category = await Factory.model('App/Models/Category').make();
  await market.categories().save(category);

  const data = {
    name: 'File',
    price: 25.3,
  };

  const response = await client
    .post(`api/v1/markets/${market.id}/categories/${category.id}/products`)
    .send(data)
    .end();

  response.assertStatus(401);
});
