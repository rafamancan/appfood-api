'use strict';

const User = use('App/Models/User');
const Category = use('App/Models/Category');
const Order = use('App/Models/Order');
const Item = use('App/Models/Item');

class ItemController {
  async store({ response, params, request }) {
    const { user_id, order_id } = params;
    const { category_id } = request.only(['category_id']);

    const user = await User.find(user_id);
    if (!user) {
      return response.status(400).send([{ error: 'User not found' }]);
    }

    const order = await Order.find(order_id);
    if (!order) {
      return response.status(400).send([{ error: 'Order not found' }]);
    }

    const category = await Category.find(category_id);
    if (!category) {
      return response.status(400).send([{ error: 'Category not found' }]);
    }

    const data = request.only(['obs', 'total']);
    const item = await Item.create({
      ...data,
      order_id: order.id,
      category_id: category.id,
    });

    return response.created(item);
  }
}

module.exports = ItemController;
