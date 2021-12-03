export const state = () => ({
  /* some product ids"60bfb537018d9d57e02699af","60bfb575018d9d57e02699b6" */
  productIds: [],
  populatedProducts: [],
})

export const getters = {
  getPopulatedProducts(state) {
    return state.populatedProducts
  },
  getSubtotalPrice(state) {
    const total = state.populatedProducts.reduce((t, product) => {
      const price = product.price.special
        ? product.price.special
        : product.price.regular
      return t + product.quantity * Number.parseFloat(price)
    }, 0)
    return Number.parseInt(total.toFixed(2))
  },
  getProductsQuantity(state) {
    const total = state.productIds.reduce((t, product) => {
      return t + product.quantity
    }, 0)
    return total
  },
}

export const actions = {
  /* TODO when you remove the product from strapi and if user still have that product id on localstorage error occurs */
  async populateProducts({ state, commit }) {
    if (!state.productIds.length > 0) return
    const populatedProducts = await Promise.all(
      state.productIds.map(async (e) => {
        const product = await this.$axios.$get(
          `products/${e.id}`
        ) /* you dont have to return await in callback. you can use it in code block */
        return { ...product, quantity: e.quantity }
      })
    )

    commit('SET_POPULATED_PRODUCTS', { populatedProducts })
  },
  addToCart({ commit, dispatch }, payload) {
    commit('ADD_TO_CART', payload)
    // dispatch('populateProducts') /* state and dispatch is made locally */
  },
  removeFromCart({ commit }, payload) {
    commit('REMOVE_FROM_CART', payload)
  },
  changeQuantity({ commit }, payload) {
    commit('CHANGE_QUANTITY', payload)
  },
}

export const mutations = {
  ADD_TO_CART(state, { productId, quantity }) {
    /* TODO to add quantity create object and set quantity property */
    /* check if already in array just populate quantity */
    const productIndex = state.productIds.findIndex((e) => e.id === productId)
    if (productIndex !== -1) {
      return (state.productIds[productIndex].quantity += quantity)
    }

    state.productIds.push({ id: productId, quantity })
  },
  REMOVE_FROM_CART(state, { productId }) {
    /* remove from both ids and populated */
    const index = state.productIds.findIndex((e) => e.id === productId)
    if (index === -1) return
    state.productIds.splice(index, 1)

    const populatedIndex = state.populatedProducts.findIndex(
      (e) => e.id === productId
    )
    state.populatedProducts.splice(populatedIndex, 1)
  },
  SET_POPULATED_PRODUCTS(state, { populatedProducts }) {
    state.populatedProducts = populatedProducts
  },
  DUMP_PRODUCT_IDS(state) {
    state.productIds = []
  },
  CHANGE_QUANTITY(state, { id, quantity }) {
    const product = state.productIds.find((e) => e.id === id)
    if (!product) return
    product.quantity = quantity
    /* also change on populated */
    const populatedProduct = state.populatedProducts.find((e) => e.id === id)
    populatedProduct.quantity = quantity
  },
}
