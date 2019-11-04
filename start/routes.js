'use strict';

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' };
});

/*
|--------------------------------------------------------------------------
| Users
|--------------------------------------------------------------------------
*/
Route.group(() => {
  // user
  Route.post('/', 'UserController.store').validator('CreateUser');

  // sessions
  Route.post('/sessions', 'SessionController.create').validator(
    'CreateUserSession'
  );

  // address
  Route.get('/:user_id/addresses', 'AddressController.show').middleware(
    'auth:user'
  );
  Route.post('/:user_id/addresses', 'AddressController.store')
    .validator('CreateUserAddress')
    .middleware('auth:user');

  // order
  Route.post('/:user_id/orders', 'OrderController.store')
    .validator('CreateUserOrder')
    .middleware('auth:user');

  // items
  Route.post('/:user_id/orders/:order_id/items', 'ItemController.store')
    .validator('CreateOrderItem')
    .middleware('auth:user');

  // items product
  Route.post(
    '/:user_id/orders/:order_id/items/:item_id/products/:product_id',
    'ItemProductController.store'
  )
    .validator('CreateItemProduct')
    .middleware('auth:user');
}).prefix('api/v1/users');

/*
|--------------------------------------------------------------------------
| Markets
|--------------------------------------------------------------------------
*/
Route.group(() => {
  // market
  Route.post('/', 'MarketController.store').validator('CreateMarket');

  // category
  Route.get('/:market_id/categories', 'CategoryController.show').middleware([
    'auth:market',
  ]);
  Route.post('/:market_id/categories', 'CategoryController.store')
    .validator('CreateMarketCategory')
    .middleware(['auth:market']);
  Route.post('/:market_id/categories', 'CategoryController.store')
    .validator('CreateMarketCategory')
    .middleware(['auth:market']);

  // product
  Route.post(
    '/:market_id/categories/:category_id/products',
    'ProductController.store'
  )
    .validator('CreateCategoryProduct')
    .middleware(['auth:market']);
}).prefix('api/v1/markets');
