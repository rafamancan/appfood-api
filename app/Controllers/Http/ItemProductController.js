'use strict';

const User = use('App/Models/User');
const Order = use('App/Models/Order');
const Item = use('App/Models/Item');
const Product = use('App/Models/Product');
const ItemProduct = use('App/Models/ItemProduct');

class ItemProductController {
  async store({ response, params, request }) {
    const { user_id, order_id, item_id, product_id } = params;
    const user = await User.find(user_id);
    if (!user) {
      return response.status(400).send([{ error: 'User not found' }]);
    }

    const order = await Order.find(order_id);
    if (!order) {
      return response.status(400).send([{ error: 'Order not found' }]);
    }

    const item = await Item.find(item_id);
    if (!item) {
      return response.status(400).send([{ error: 'Item not found' }]);
    }

    const product = await Product.find(product_id);
    if (!product) {
      return response.status(400).send([{ error: 'Product not found' }]);
    }

    const data = request.only('obs');

    const itemProduct = await ItemProduct.create({
      ...data,
      item_id,
      product_id,
    });

    return response.created(itemProduct);
  }

  async show({ params }) {
    const category = Category.query()
      .where('product_id', params.product_id)
      .with('category')
      .fetch();

    return category;
  }
}

module.exports = ItemProductController;
