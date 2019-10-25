'use strict';

class CreateMarket {
  get rules() {
    return {
      name: 'required|string',
      email: 'required|email|unique:markets,email',
      password: 'required|string',
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

module.exports = CreateMarket;
