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

  // address
  Route.get('/:id/addresses', 'AddressController.show').middleware('auth:user');
  Route.post('/:id/addresses', 'AddressController.store')
    .validator('CreateUserAddress')
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
