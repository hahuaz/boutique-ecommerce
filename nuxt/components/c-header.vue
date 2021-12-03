<template>
  <div>
    <SfHeader
      logo="/logo.png"
      title="Storefront UI"
      cart-icon="empty_cart"
      wishlist-icon="heart"
      account-icon="profile"
      search-placeholder="Search for items"
      search-value=""
      :wishlist-items-qty="3"
      :cart-items-qty="2"
      slider-options="{
      hoverpause:true
      }"
    >
      <template #navigation>
        <div class="nav--links grid grid-flow-col space-x-8 py-10 text-xl">
          <nuxt-link to="/categories/sweatshirt">
            <a>Sweatshirt</a>
          </nuxt-link>
          <nuxt-link to="/categories/sweatshirt">
            <a>Pants</a>
          </nuxt-link>
          <nuxt-link to="/categories/sweatshirt">
            <a>T-Shirts</a>
          </nuxt-link>
        </div>
      </template>
      <template #header-icons>
        <div class="sf-header__icons">
          <el-dropdown trigger="click" class="sf-header__action">
            <div
              class="
                grid grid-flow-row
                justify-items-center
                space-y-1
                cursor-pointer
                hover:bg-gray-200
                rounded-sm
                px-3
                py-1
                w-16
              "
            >
              <!-- TODO set active icon -->
              <font-awesome-icon
                data-testid="accountIcon"
                :class="{
                  active: $route.path === 'account',
                }"
                :icon="['fas', 'user']"
                class="text-lg icon"
              />
              <span class="text-xs font-semibold">Account</span>
            </div>
            <el-dropdown-menu slot="dropdown">
              <template v-if="!user">
                <el-dropdown-item>
                  <div
                    class="
                      grid grid-flow-col
                      items-center
                      justify-around
                      font-semibold
                      text-center
                      w-44
                    "
                  >
                    <span
                      class="hover:text-purple-700 cursor-pointer"
                      @click="openLogReqModal({ type: 'login' })"
                      >Login</span
                    >
                    <span class="text-gray-200">|</span>
                    <span
                      class="hover:text-purple-700 cursor-pointer"
                      @click="openLogReqModal({ type: 'register' })"
                      >Register</span
                    >
                  </div>
                </el-dropdown-item>
              </template>
              <template v-else>
                <el-dropdown-item>
                  welcome {{ user.username }}
                </el-dropdown-item>
                <el-dropdown-item>
                  <span class="cursor-pointer" @click="logout">logout</span>
                </el-dropdown-item>
              </template>
            </el-dropdown-menu>
          </el-dropdown>

          <div
            class="
              sf-header__action
              grid grid-flow-row
              justify-items-center
              space-y-1
              cursor-pointer
              hover:bg-gray-200
              rounded-sm
              px-3
              py-1
              w-16
            "
            @click="wishlistClicked"
          >
            <font-awesome-icon
              :icon="['fas', 'heart']"
              class="icon text-lg"
              data-testid="wishlistIcon"
              :class="{
                active: $route.path === '/wishlist',
              }"
            />
            <span class="text-xs font-semibold">Wishlist</span>
          </div>

          <nuxt-link
            to="/cart"
            class="
              sf-header__action
              grid grid-flow-row
              justify-items-center
              space-y-1
              cursor-pointer
              hover:bg-gray-200
              rounded-sm
              px-3
              py-1
              w-16
            "
          >
            <font-awesome-icon
              :icon="['fas', 'shopping-cart']"
              class="icon text-lg"
              data-testid="cartIcon"
              :class="{
                active: $route.path === '/cart',
              }"
            />
            <span class="text-xs font-semibold">Cart</span>
          </nuxt-link>
        </div>
      </template>
    </SfHeader>

    <login-modal
      style="z-index: 1000"
      class="relative"
      @close="closeLogReqModal"
    ></login-modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import { SfHeader } from '@storefront-ui/vue'
export default {
  components: {
    SfHeader,
  },
  data() {
    return {
      loginVisible: false,
      wishlistItemsQty: 4,
      wishlistHasProducts: true,
      cartHasProducts: true,
      cartItemsQty: 2,
    }
  },
  computed: {
    activeIcon() {
      return this.$store.state.ui.headerActiveIcon
    },
    user() {
      return this.$store.state.user
    },
  },
  methods: {
    ...mapActions('ui', [
      'openLogReqModal', // also supports payload `this.nameOfAction(amount)`
    ]),

    logout() {
      this.$store.dispatch('logoutUser')
      this.$router.push('/')
    },
    closeLogReqModal() {
      this.$store.commit('ui/TOGGLE_MODAL_VISIBLITY')
    },
    wishlistClicked() {
      if (!this.$store.getters.getUser) {
        return this.openLogReqModal({ type: 'login' })
      }
      this.$router.push('/wishlist')
    },
  },
}
</script>

<style lang="scss" scoped>
.icon {
  &.active {
    color: var(--c-primary);
  }
}

.nav--links {
  > a {
    cursor: pointer;
    transition: color 0.2s;
    border-bottom: 1px solid transparent;
    &:hover {
      color: var(--c-primary);
      border-bottom: 1px solid var(--c-primary);
    }
  }
}
.el-dropdown,
.el-dropdown-menu__item {
  color: black;
}
.el-dropdown-menu__item {
  cursor: default;
}
.el-dropdown-menu__item:focus,
.el-dropdown-menu__item:not(.is-disabled):hover {
  color: unset;
  background-color: unset;
}
</style>
