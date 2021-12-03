"use strict";

const _ = require("lodash");
const { sanitizeEntity } = require("strapi-utils");

const sanitizeUser = (user) =>
  sanitizeEntity(user, {
    model: strapi.query("user", "users-permissions").model,
  });

const formatError = (error) => [
  { messages: [{ id: error.id, message: error.message, field: error.field }] },
];

module.exports = {
  async updateme(ctx) {
    const advancedConfigs = await strapi
      .store({
        environment: "",
        type: "plugin",
        name: "users-permissions",
        key: "advanced",
      })
      .get();

    /* how to get user by id */
    // const user = await strapi.plugins["users-permissions"].services.user.fetch({
    //   id,
    // });
    const update = {};

    /* by using user id on the state, you restrict to user to update only itself. */
    const { user } = ctx.state;
    const { removeWishlist, addWishlist } =
      ctx.query; /* query will be string */

    /* user can only update belows */
    /* TODO: refactor update properties */
    const { productId } = ctx.request.body;

    /* user.wishlist is array of objects. every object is contains objectId that come from mongodb. so you can't use lodash.includes. but you can use == or != to compare. i think it automaticly converts to string when we compare */
    update.wishlists = user.wishlists.map((e) => e.toString());

    if (!!addWishlist && productId) {
      if (!_.includes(update.wishlists, productId)) {
        update.wishlists.push(productId);
      }
    }
    debugger;
    if (!!removeWishlist && productId) {
      const index = update.wishlists.indexOf(productId);
      if (index != -1) {
        update.wishlists.splice(index, 1);
      }
    }

    // if (_.has(ctx.request.body, "email") && !email) {
    //   return ctx.badRequest("email.notNull");
    // }

    // if (
    //   _.has(ctx.request.body, "password") &&
    //   !password &&
    //   user.provider === "local"
    // ) {
    //   return ctx.badRequest("password.notNull");
    // }

    // if (_.has(ctx.request.body, "username")) {
    //   const userWithSameUsername = await strapi
    //     .query("user", "users-permissions")
    //     .findOne({ username });

    //   if (userWithSameUsername && userWithSameUsername.id != user.id) {
    //     return ctx.badRequest(
    //       null,
    //       formatError({
    //         id: "Auth.form.error.username.taken",
    //         message: "username.alreadyTaken.",
    //         field: ["username"],
    //       })
    //     );
    //   }
    // }

    // if (_.has(ctx.request.body, "email") && advancedConfigs.unique_email) {
    //   const userWithSameEmail = await strapi
    //     .query("user", "users-permissions")
    //     .findOne({ email: email.toLowerCase() });

    //   if (userWithSameEmail && userWithSameEmail.id != id) {
    //     return ctx.badRequest(
    //       null,
    //       formatError({
    //         id: "Auth.form.error.email.taken",
    //         message: "Email already taken",
    //         field: ["email"],
    //       })
    //     );
    //   }
    //   ctx.request.body.email = ctx.request.body.email.toLowerCase();
    // }

    // let updateData = {
    //   ...ctx.request.body,
    // };

    // if (_.has(ctx.request.body, "password") && password === user.password) {
    //   delete updateData.password;
    // }

    /* data contains edit's return which hold populated wishlist */
    const data = await strapi.plugins["users-permissions"].services.user.edit(
      { id: user.id } /* restrict user to update only himself */,
      update
    );

    /* here in server, fetch user that not populated and send it to front-end instead of making /users/me request from front end */
    const updatedUser = await strapi
      .query("user", "users-permissions")
      .findOne({ id: user.id }, []); /* don't populate by empty array */

    ctx.send(sanitizeUser(updatedUser));
  },
};
