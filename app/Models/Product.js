'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Product extends Model {
  categories() {
    return this.belongsTo('App/Models/Category');
  }

  items() {
    return this.hasMany('App/Models/item');
  }
}

module.exports = Product;
