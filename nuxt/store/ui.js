export const state = () => ({
  headerActiveIcon: 'account' /* account, wishlist, cart */,

  loginModalVisible: false,
  modalType: 'login',
})

export const getters = {
  modalType(state) {
    return state.modalType
  },
  isLoginVisible(state) {
    return state.loginModalVisible
  },
}

export const actions = {
  openLogReqModal({ commit }, payload) {
    commit('SET_MODAL_TYPE', payload)

    commit('TOGGLE_MODAL_VISIBLITY')
  },
}

export const mutations = {
  SET_MODAL_TYPE(state, { type }) {
    state.modalType = type
  },
  TOGGLE_MODAL_VISIBLITY(state) {
    state.loginModalVisible = !state.loginModalVisible
  },
}
