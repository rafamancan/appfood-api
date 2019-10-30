'use strict';

const Factory = use('Factory');
const { test, trait } = use('Test/Suite')('Create Order');

trait('Test/ApiClient');
trait('Auth/Client');

test('can create order with valid data', async ({ assert, client }) => {
  const market = await Factory.model('App/Models/Market').create();
  const user = await Factory.model('App/Models/User').create();

  const dataAddress = {
    street: 'Rua sei la o que teste',
    number: '90',
  };

  const address = await client
    .post(`/api/v1/users/${user.id}/addresses`)
    .loginVia(user, 'user')
    .send(dataAddress)
    .end();

  address.assertStatus(201);
  address.assertJSONSubset({
    street: dataAddress.street,
    number: dataAddress.number,
  });

  const address_id = address.body.id;
  const data = {
    user_id: user.id,
    market_id: market.id,
    address_id,
    status: 'pedido_feito',
    obs: 'obs test',
    total: 0.0,
  };

  const response = await client
    .post(`api/v1/users/${user.id}/orders`)
    .loginVia(user, 'user')
    .send(data)
    .end();

  response.assertStatus(201);
  response.assertJSONSubset({
    market_id: data.market_id,
    address_id: data.address_id,
    status: data.status,
    obs: data.obs,
    total: data.total,
  });
});

test("can't create order without authenticated user", async ({
  assert,
  client,
}) => {
  const market = await Factory.model('App/Models/Market').create();
  const user = await Factory.model('App/Models/User').create();

  const dataAddress = {
    street: 'Rua sei la o que teste',
    number: '90',
  };

  const address = await client
    .post(`/api/v1/users/${user.id}/addresses`)
    .loginVia(user, 'user')
    .send(dataAddress)
    .end();

  address.assertStatus(201);
  address.assertJSONSubset({
    street: dataAddress.street,
    number: dataAddress.number,
  });

  const address_id = address.body.id;
  const data = {
    user_id: user.id,
    market_id: market.id,
    address_id,
    status: 'pedido_feito',
    obs: 'obs test',
    total: 0.0,
  };

  const response = await client
    .post(`api/v1/users/${user.id}/orders`)
    .send(data)
    .end();

  response.assertStatus(401);
});

test("can't create order without addrress", async ({ assert, client }) => {
  const market = await Factory.model('App/Models/Market').create();
  const user = await Factory.model('App/Models/User').create();

  const data = {
    user_id: user.id,
    market_id: market.id,
    status: 'pedido_feito',
    obs: 'obs test',
    total: 0.0,
  };

  const response = await client
    .post(`api/v1/users/${user.id}/orders`)
    .loginVia(user, 'user')
    .send(data)
    .end();

  response.assertStatus(400);
  response.assertJSONSubset([
    {
      message: 'address_id is required',
      field: 'address_id',
      validation: 'required',
    },
  ]);
});

test("can't create order without user", async ({ assert, client }) => {
  const market = await Factory.model('App/Models/Market').create();
  const user = await Factory.model('App/Models/User').create();

  const dataAddress = {
    street: 'Rua sei la o que teste',
    number: '90',
  };

  const address = await client
    .post(`/api/v1/users/${user.id}/addresses`)
    .loginVia(user, 'user')
    .send(dataAddress)
    .end();

  address.assertStatus(201);
  address.assertJSONSubset({
    street: dataAddress.street,
    number: dataAddress.number,
  });

  const address_id = address.body.id;
  const data = {
    market_id: market.id,
    address_id,
    status: 'pedido_feito',
    obs: 'obs test',
    total: 0.0,
  };

  const response = await client
    .post(`api/v1/users/${user.id}/orders`)
    .loginVia(user, 'user')
    .send(data)
    .end();

  response.assertStatus(400);
  response.assertJSONSubset([
    {
      message: 'user_id is required',
      field: 'user_id',
      validation: 'required',
    },
  ]);
});

test("can't create order without market", async ({ assert, client }) => {
  const market = await Factory.model('App/Models/Market').create();
  const user = await Factory.model('App/Models/User').create();

  const dataAddress = {
    street: 'Rua sei la o que teste',
    number: '90',
  };

  const address = await client
    .post(`/api/v1/users/${user.id}/addresses`)
    .loginVia(user, 'user')
    .send(dataAddress)
    .end();

  address.assertStatus(201);
  address.assertJSONSubset({
    street: dataAddress.street,
    number: dataAddress.number,
  });

  const address_id = address.body.id;
  const data = {
    address_id,
    status: 'pedido_feito',
    obs: 'obs test',
    total: 0.0,
  };

  const response = await client
    .post(`api/v1/users/${user.id}/orders`)
    .loginVia(user, 'user')
    .send(data)
    .end();

  response.assertStatus(400);
  response.assertJSONSubset([
    {
      message: 'market_id is required',
      field: 'market_id',
      validation: 'required',
    },
  ]);
});

test("can't create order with invalid enum status value", async ({
  assert,
  client,
}) => {
  const market = await Factory.model('App/Models/Market').create();
  const user = await Factory.model('App/Models/User').create();

  const dataAddress = {
    street: 'Rua sei la o que teste',
    number: '90',
  };

  const address = await client
    .post(`/api/v1/users/${user.id}/addresses`)
    .loginVia(user, 'user')
    .send(dataAddress)
    .end();

  address.assertStatus(201);
  address.assertJSONSubset({
    street: dataAddress.street,
    number: dataAddress.number,
  });

  const address_id = address.body.id;
  const data = {
    user_id: user.id,
    market_id: market.id,
    address_id,
    status: 'status_nada_a_ver',
    obs: 'obs test',
    total: 0.0,
  };

  const response = await client
    .post(`api/v1/users/${user.id}/orders`)
    .loginVia(user, 'user')
    .send(data)
    .end();

  response.assertStatus(400);
  response.assertJSONSubset([
    {
      message: 'status is not a valid status',
      field: 'status',
      validation: 'in',
    },
  ]);
});
