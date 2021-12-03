export const state = () => ({
  products: [],
})

export const actions = {
  async getProducts({ commit }, { category }) {
    const data = await this.$axios.$get(`categories?name=${category}`)
    if (data.length <= 0)
      throw new Error('there is no product in this category')
    commit('SET_PRODUCTS', { products: data[0].products })
  },
  async getProduct({ commit }, { id }) {
    const product = await this.$axios.$get(`products/${id}`)
    return product
  },
}

export const mutations = {
  SET_PRODUCTS(state, { products }) {
    state.products = products
  },
}
