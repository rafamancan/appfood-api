'use strict';

class CreateOrderItem {
  get rules() {
    return {
      order_id: 'required|integer',
      category_id: 'required|integer',
      obs: 'string',
      total: 'number',
    };
  }

  get messages() {
    return {
      required: '{{ field }} is required',
      string: '{{ field }} is not a valid string',
      integer: '{{ field }} is not a valid integer',
      number: '{{ field }} is not a valid number',
    };
  }

  get validateAll() {
    return true;
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).json(errorMessages);
  }
}

module.exports = CreateOrderItem;
