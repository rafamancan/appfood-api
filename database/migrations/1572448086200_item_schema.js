'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ItemSchema extends Schema {
  up() {
    this.create('items', table => {
      table.increments();
      table
        .integer('order_id')
        .unsigned()
        .references('id')
        .inTable('orders');
      table
        .integer('category_id')
        .unsigned()
        .references('id')
        .inTable('categories');
      table.float('total');
      table.string('obs', 254);
      table.timestamps();
    });
  }

  down() {
    this.drop('items');
  }
}

module.exports = ItemSchema;
