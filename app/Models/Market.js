'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash');

class Market extends Model {
  static boot() {
    super.boot();

    /**
     * A hook to hash the market password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async marketInstance => {
      if (marketInstance.dirty.password) {
        marketInstance.password = await Hash.make(marketInstance.password);
      }
    });
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany('App/Models/Token');
  }

  categories() {
    return this.hasMany('App/Models/Category');
  }
}

module.exports = Market;
