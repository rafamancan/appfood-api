'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Item extends Model {
  orders() {
    return this.belongsTo('App/Models/Order');
  }

  categories() {
    return this.belongsTo('App/Models/Category');
  }

  products() {
    return this.hasMany('App/Models/Product');
  }
}

module.exports = Item;
