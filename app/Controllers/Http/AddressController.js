'use strict';

const User = use('App/Models/User');
const Address = use('App/Models/Address');

class AddressController {
  async store({ response, params, request }) {
    const { user_id } = params;
    await User.firstOrFail('id', user_id);

    const data = request.only(['street', 'number']);

    const address = await Address.create({ ...data, user_id });

    return response.created(address);
  }

  async show({ params }) {
    const address = Address.query()
      .where('user_id', params.user_id)
      .with('user')
      .fetch();

    return address;
  }
}

module.exports = AddressController;
