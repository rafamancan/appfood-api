'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Item extends Model {
  /*
   * @method orders
   *
   * @return {Object}
   */
  orders() {
    return this.belongsTo('App/Models/Order');
  }

  /*
   * @method categories
   *
   * @return {Object}
   */
  categories() {
    return this.belongsTo('App/Models/Category');
  }
}

module.exports = Item;
