'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CategorySchema extends Schema {
  up() {
    this.create('categories', table => {
      table.increments();
      table
        .integer('market_id')
        .unsigned()
        .references('id')
        .inTable('markets');
      table.string('name', 254).notNullable();
      table.integer('min_choices');
      table.integer('max_choices');
      table.float('price');
      table.timestamps();
    });
  }

  down() {
    this.drop('categories');
  }
}

module.exports = CategorySchema;
