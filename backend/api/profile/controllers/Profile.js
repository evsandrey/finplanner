'use strict';

/**
 * A set of functions called "actions" for `User`
 */

module.exports = {
  index: async (ctx) => {
    console.log(ctx.state.user)
    if (ctx.state.user) {
      ctx.send(ctx.state.user)
    } else {
      ctx.throw(403,"SUCK");
    }
  }
};
