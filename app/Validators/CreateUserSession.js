'use strict';

class CreateUserSession {
  get rules() {
    return {
      email: 'required|email',
      password: 'required|string',
    };
  }

  get messages() {
    return {
      required: '{{ field }} is required',
      email: '{{ field }} is not valid e-mail',
      string: '{{ field }} is not a valid string',
    };
  }

  get validateAll() {
    return true;
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).json(errorMessages);
  }
}

module.exports = CreateUserSession;
