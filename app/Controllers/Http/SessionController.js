'use strict';
const User = use('App/Models/User');

class SessionController {
  async create({ request, auth }) {
    const { email, password } = request.all();

    const token = await auth.attempt(email, password);

    const { name } = await User.findBy('email', email);
    const profile = {
      name,
      email,
    };

    return { profile, token: token.token };
  }
}

module.exports = SessionController;
