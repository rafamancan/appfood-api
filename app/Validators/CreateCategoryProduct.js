'use strict';

class CreateCategoryProduct {
  get rules() {
    return {
      name: 'required|string',
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

module.exports = CreateCategoryProduct;
