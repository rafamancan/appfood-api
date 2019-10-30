'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Order extends Model {
  /*
   * @method users
   *
   * @return {Object}
   */
  users() {
    return this.belongsTo('App/Models/User');
  }

  /*
   * @method markets
   *
   * @return {Object}
   */
  markets() {
    return this.belongsTo('App/Models/Market');
  }

  /*
   * @method addresses
   *
   * @return {Object}
   */
  addresses() {
    return this.belongsTo('App/Models/Address');
  }

  /**
   * @method items
   *
   * @return {Object}
   */
  items() {
    return this.hasMany('App/Models/Item');
  }
}

module.exports = Order;
