'use strict';

class CreateMarketCategory {
  get rules() {
    return {
      name: 'required|string',
      min_choices: 'number',
      max_choices: 'number',
      price: 'number',
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

module.exports = CreateMarketCategory;
