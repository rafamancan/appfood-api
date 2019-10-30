'use strict';

class CreateUserOrder {
  get rules() {
    return {
      user_id: 'required|integer',
      market_id: 'required|integer',
      address_id: 'required|integer',
      status:
        'required|in:pedido_feito,visualizado,saiu_para_entrega,entregue,cancelado',
      obs: 'string',
      total: 'number',
    };
  }

  get messages() {
    return {
      required: '{{ field }} is required',
      string: '{{ field }} is not a valid string',
      integer: '{{ field }} is not a valid integer',
      in: '{{ field }} is not a valid status',
    };
  }

  get validateAll() {
    return true;
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).json(errorMessages);
  }
}

module.exports = CreateUserOrder;
