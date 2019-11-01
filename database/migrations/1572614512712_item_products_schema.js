'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ItemProductsSchema extends Schema {
  up() {
    this.create('item_products', table => {
      table.increments();
      table
        .integer('item_id')
        .unsigned()
        .references('id')
        .inTable('items');
      table
        .integer('product_id')
        .unsigned()
        .references('id')
        .inTable('products');
      table.string('obs', 254);
      table.timestamps();
    });
  }

  down() {
    this.drop('item_products');
  }
}

module.exports = ItemProductsSchema;
