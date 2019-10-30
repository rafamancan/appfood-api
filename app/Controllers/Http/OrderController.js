'use strict';

const User = use('App/Models/User');
const Address = use('App/Models/Address');
const Market = use('App/Models/Market');
const Order = use('App/Models/Order');

class OrderController {
  async store({ response, params, request }) {
    const { user_id } = params;
    const { address_id, market_id } = request.only(['address_id', 'market_id']);

    const user = User.find(user_id);
    if (!user) {
      return response.status(400).send([{ error: 'User not found' }]);
    }

    const address = Address.find(address_id);
    if (!address) {
      return response.status(400).send([{ error: 'Address not found' }]);
    }

    const market = Market.find(market_id);
    if (!market) {
      return response.status(400).send([{ error: 'Market not found' }]);
    }

    const data = request.only([
      'address_id',
      'market_id',
      'status',
      'obs',
      'total',
    ]);

    const order = await Order.create({ ...data, user_id });

    return response.created(order);
  }
}

module.exports = OrderController;
