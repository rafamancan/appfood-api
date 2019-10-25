'use strict';

const User = use('App/Models/User');

class UserController {
  async store({ response, request }) {
    const user = await User.create({
      ...request.only(['name', 'email', 'password']),
    });

    return response.created(user);
  }
}

module.exports = UserController;
