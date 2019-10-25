'use strict';

class CreateUserAddress {
  get rules() {
    return {
      street: 'required|string',
      number: 'required|string',
    };
  }

  get messages() {
    return {
      required: '{{ field }} is required',
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

module.exports = CreateUserAddress;
