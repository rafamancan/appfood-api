'use strict';

const Market = use('App/Models/Market');

class MarketController {
  async store({ response, request }) {
    const market = await Market.create({
      ...request.only(['name', 'email', 'password']),
    });

    return response.created(market);
  }
}

module.exports = MarketController;
