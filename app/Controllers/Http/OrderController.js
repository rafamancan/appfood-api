'use strict';

const User = use('App/Models/User');
const Address = use('App/Models/Address');
const Market = use('App/Models/Market');
const Order = use('App/Models/Order');

class OrderController {
  async store({ response, params, request }) {
    const { user_id } = params;
    await User.firstOrFail('id', user_id);
    await Address.firstOrFail('id', request.only(['address_id']));
    await Market.firstOrFail('id', request.only(['market_id']));

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
