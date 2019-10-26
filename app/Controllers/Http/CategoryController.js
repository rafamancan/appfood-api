'use strict';

const Market = use('App/Models/Market');
const Category = use('App/Models/Category');

class CategoryController {
  async store({ response, params, request }) {
    const { market_id } = params;
    await Market.firstOrFail('id', market_id);

    const data = request.only(['name', 'min_choices', 'max_choices', 'price']);

    const category = await Category.create({ ...data, market_id });

    return response.created(category);
  }

  async show({ params }) {
    const category = Category.query()
      .where('market_id', params.market_id)
      .with('market')
      .fetch();

    return category;
  }
}

module.exports = CategoryController;
