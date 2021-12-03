"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  /**
   * Promise to fetch all records
   *
   * @return {Promise}
   */
  find(params) {
    return strapi
      .query("product")
      .find(
        params,
        []
      ); /* empty array as second arg: do not populate category when you want to get products */
  },
};
