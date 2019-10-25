'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class MarketSchema extends Schema {
  up() {
    this.create('markets', table => {
      table.increments();
      table
        .string('name', 254)
        .notNullable()
        .unique();
      table
        .string('email', 254)
        .notNullable()
        .unique();
      table.string('password', 60).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('markets');
  }
}

module.exports = MarketSchema;
