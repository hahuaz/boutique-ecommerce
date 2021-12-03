<template>
  <SfModal
    id="login"
    :visible="isLoginVisible"
    :title="modalTitle"
    v-on="$listeners"
  >
    <transition name="sf-fade" mode="out-in">
      <div
        v-if="modalType === 'login'"
        key="log-in"
        class="modal-content"
        data-testid="login-modal"
      >
        <form class="form" @submit.prevent="login">
          <SfInput
            v-model="email"
            name="email"
            label="Your email"
            class="form__element"
            type="email"
          />
          <SfInput
            v-model="password"
            name="password"
            label="Password"
            type="password"
            class="form__element"
            :has-show-password="true"
          />
          <SfCheckbox
            v-model="rememberMe"
            name="remember-me"
            label="Remember me"
            class="form__element form__checkbox"
          />
          <SfButton
            type="submit"
            class="sf-button--full-width form__submit"
            data-testid="log-in-button"
          >
            Log In
          </SfButton>
        </form>
        <SfButton
          class="sf-button--text action-button"
          data-testid="forgotten-password-button"
        >
          Forgotten password?
        </SfButton>
        <div class="aside">
          <SfHeading
            title="Don't have an account yet?"
            :level="3"
            class="aside__heading"
          />
          <SfButton
            class="sf-button--text"
            data-testid="register-now-button"
            @click="setModalType({ type: 'register' })"
          >
            Register now
          </SfButton>
        </div>
      </div>
      <div
        v-else-if="modalType === 'register'"
        key="sign-up"
        class="modal-content"
        data-testid="signin-modal"
      >
        <form class="form" @submit.prevent="register">
          <SfInput
            v-model="firstName"
            name="first-name"
            label="Name"
            class="form__element"
          />
          <SfInput
            v-model="lastName"
            name="last-name"
            label="Last Name"
            class="form__element"
          />
          <SfInput
            v-model="email"
            name="email"
            label="Your email"
            class="form__element"
            type="email"
          />
          <SfInput
            v-model="password"
            name="password"
            label="Password"
            type="password"
            class="form__element"
          />
          <SfButton
            type="submit"
            class="sf-button--full-width form__submit"
            data-testid="create-acount-button"
          >
            Create an account
          </SfButton>
        </form>
        <SfButton
          class="sf-button--text action-button"
          data-testid="log-in-account"
          @click="setModalType({ type: 'login' })"
        >
          or Log In To Your Account
        </SfButton>
      </div>
    </transition>
  </SfModal>
</template>
<script>
import { mapGetters } from 'vuex'

import {
  SfModal,
  SfInput,
  SfButton,
  SfCheckbox,
  SfHeading,
} from '@storefront-ui/vue'
export default {
  name: 'Login',
  components: {
    SfModal,
    SfInput,
    SfButton,
    SfCheckbox,
    SfHeading,
  },
  props: {},
  data() {
    return {
      email: '',
      password: '',
      createAccount: false,
      rememberMe: false,
      firstName: '',
      lastName: '',
    }
  },
  computed: {
    ...mapGetters('ui', ['isLoginVisible', 'modalType']),
    modalTitle() {
      return this.isLogIn ? 'Log In' : 'Join Vue Storefront'
    },
  },
  watch: {
    modalType() {
      this.email = ''
      this.password = ''
      this.createAccount = false
      this.rememberMe = false
      this.firstName = ''
      this.lastName = ''
    },
  },
  mounted() {},
  methods: {
    async register() {
      try {
        /* TODO strapi wants username unique, change it. show loading inline when request made */
        const { jwt } = await this.$axios.$post('auth/local/register', {
          username: this.firstName,
          userlastname: this.lastName,
          email: this.email,
          password: this.password,
        })
        // this.$store.commit('SET_USER', { user })
        this.$store.commit('SET_JWT', { jwt })
        this.$store.dispatch('getUser')

        this.$store.commit('ui/TOGGLE_MODAL_VISIBLITY')
      } catch (error) {
        console.log(error.response)
      }
    },
    async login() {
      try {
        const { jwt } = await this.$axios.$post('auth/local', {
          identifier: this.email,
          password: this.password,
        })
        /* TODO */
        /* when you login user's wishlist populated. but when you refresh and get user with jwt it's not populated.
        so get user with jwt and don't set directly. to prevent extra request you can modify strapi login controller to not populate user.
         */
        // this.$store.commit('SET_USER', { user })
        this.$store.commit('SET_JWT', { jwt })
        this.$store.dispatch('getUser')
        this.$store.commit('ui/TOGGLE_MODAL_VISIBLITY')
      } catch (error) {
        console.log(error.response)
      }
    },
    setModalType(payload) {
      this.$store.commit('ui/SET_MODAL_TYPE', payload)
    },
  },
}
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';
.modal-content,
.aside {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form {
  width: 100%;
  &__element {
    margin: var(--spacer-base) 0;
  }
  &__checkbox {
    margin: var(--spacer-xl) 0 var(--spacer-2xl) 0;
  }
  &__submit {
    margin: var(--spacer-xl) 0 0 0;
  }
}
.action-button {
  margin: var(--spacer-xl) 0;
}
.aside {
  margin: 0 0 var(--spacer-xl) 0;
  &__heading {
    --heading-title-color: var(--c-primary);
    margin: 0 0 var(--spacer-sm) 0;
  }
}
</style>
