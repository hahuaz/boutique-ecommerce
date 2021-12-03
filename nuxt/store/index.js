export const state = () => ({
  user: null,
  jwt: null,
  wishlist: null,
})

export const getters = {
  getWishlist(state) {
    return state.wishlist
  },
  getUser(state) {
    return state.user
  },
}

export const actions = {
  logoutUser({ commit }) {
    commit('SET_USER', {})
    commit('SET_JWT', {})
    commit('SET_WISHLIST', {})
  },
  async getUser({ commit, state }) {
    try {
      const user = await this.$axios.$get('users/me', {
        headers: {
          authorization: `Bearer ${state.jwt}`,
        },
      })

      commit('SET_USER', { user })
    } catch (error) {
      console.log(error.response)
      throw new Error("Can't get user")
    }
  },
  async populateWishlist({ commit, state }) {
    try {
      const wishlist = await Promise.all(
        state.user.wishlists.map(async (productId) => {
          return await this.$axios.$get(`products/${productId}`)
        })
      )

      commit('SET_WISHLIST', { wishlist })
    } catch (error) {
      console.log(error)
      throw new Error("Can't populate wishlist")
    }
  },
  async addToWishlist({ commit, state, dispatch }, { productId }) {
    try {
      /* if user not logged in then open login modal */
      if (!state.user) {
        return commit('ui/TOGGLE_MODAL_VISIBLITY')
      }
      const user = await this.$axios.$put(
        `users/me?addWishlist=true`,
        {
          productId,
        },
        {
          headers: {
            authorization: `Bearer ${state.jwt}`,
          },
        }
      )

      commit('SET_USER', { user })
      return 'added'
    } catch (error) {
      console.log(error.response)
      throw new Error("Can't add to wish list")
    }
  },
  async removeFromWishlist({ commit, state, dispatch }, { productId }) {
    try {
      const user = await this.$axios.$put(
        `users/me?removeWishlist=true`,
        {
          productId,
        },
        {
          headers: {
            authorization: `Bearer ${state.jwt}`,
          },
        }
      )

      commit('SET_USER', { user })
      /* you don't dispatch populateWishlist or modify wishlist here. dispatch("populateWishlist") called inside wishlist component when user changes. */
    } catch (error) {
      console.log(error.response)
      throw new Error("Can't add to wish list")
    }
  },
}

export const mutations = {
  SET_USER(state, { user }) {
    state.user = user
  },
  SET_JWT(state, { jwt }) {
    state.jwt = jwt
  },
  SET_WISHLIST(state, { wishlist }) {
    state.wishlist = wishlist
  },
}
