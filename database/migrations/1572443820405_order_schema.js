'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class OrderSchema extends Schema {
  up() {
    this.create('orders', table => {
      table.increments();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users');
      table
        .integer('market_id')
        .unsigned()
        .references('id')
        .inTable('markets');
      table
        .integer('address_id')
        .unsigned()
        .references('id')
        .inTable('addresses');
      table
        .enu('status', [
          'pedido_feito',
          'visualizado',
          'saiu_para_entrega',
          'entregue',
          'cancelado',
        ])
        .notNullable();
      table.float('total').notNullable();
      table.string('obs', 254);
      table.timestamps();
    });
  }

  down() {
    this.drop('orders');
  }
}

module.exports = OrderSchema;
