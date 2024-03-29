'use strict';

class UpdateUser {
  get rules() {
    return {
      name: 'required|string',
      email: 'required|email',
      password: 'string',
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

module.exports = UpdateUser;
