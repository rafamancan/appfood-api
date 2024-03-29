'use strict';

const Category = use('App/Models/Category');
const Product = use('App/Models/Product');

class CategoryController {
  async store({ response, params, request }) {
    const { category_id } = params;
    const category = Category.find(category_id);
    if (!category) {
      return response.status(400).send([{ error: 'Category not found' }]);
    }
    const data = request.only(['name', 'price']);

    const product = await Product.create({ ...data, category_id });

    return response.created(product);
  }

  async show({ params }) {
    const category = Category.query()
      .where('product_id', params.product_id)
      .with('category')
      .fetch();

    return category;
  }
}

module.exports = CategoryController;
