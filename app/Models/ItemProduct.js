'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class ItemProduct extends Model {
  items() {
    return this.belongsTo('App/Models/Item');
  }

  products() {
    return this.hasMany('App/Models/Product');
  }
}

module.exports = ItemProduct;
