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

Route.post('/api/users', 'UserController.store').validator('CreateUser');

Route.post('/api/users/:id/addresses', 'AddressController.store')
  .validator('CreateUserAddress')
  .middleware('auth:user');

Route.get('/api/users/:id/addresses', 'AddressController.show').middleware(
  'auth:user'
);

Route.post('/api/markets', 'MarketController.store').validator('CreateMarket');

Route.post('/api/markets/:id/categories', 'CategoryController.store')
  .validator('CreateMarketCategory')
  .middleware(['auth:market']);

Route.get('/api/markets/:id/categories', 'CategoryController.show').middleware([
  'auth:market',
]);
