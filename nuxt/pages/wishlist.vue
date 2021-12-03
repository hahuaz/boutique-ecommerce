<template>
  <div id="detailed-cart">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <div class="detailed-cart">
      <div class="detailed-cart__main">
        <transition name="sf-fade" mode="out-in">
          <div
            v-if="getWishlist"
            key="detailed-cart"
            class="collected-product-list"
          >
            <transition-group name="sf-fade" tag="div">
              <!-- TODO go to product page when clicked. -->
              <SfProductCardHorizontal
                v-for="product in getWishlist"
                :key="product.id"
                :description="description"
                :image="product.image[0].url"
                :title="product.title"
                :regular-price="
                  product.price.regular && `$${product.price.regular}`
                "
                :special-price="
                  product.price.special && `$${product.price.special}`
                "
                class="sf-collected-product--detailed collected-product"
                @click:remove="removeHandler(product)"
              >
                <template #actions>
                  <span
                    class="border-2 border-black"
                    @click="removeFromWishlist({ productId: product.id })"
                    >remove from wishlist</span
                  >
                </template>
              </SfProductCardHorizontal>
            </transition-group>
          </div>
          <!-- TODO refactor when there is no wish -->
          <div v-else key="empty-cart" class="empty-cart">
            <SfImage
              :src="require('@storefront-ui/shared/icons/empty_cart.svg')"
              alt="Empty cart"
              class="empty-cart__image"
            />
            <SfHeading
              title="Your cart is empty"
              :level="2"
              description="Looks like you haven’t added any items to the cart yet. Start
                shopping to fill it in."
            />
            <SfButton
              class="sf-button--full-width color-primary empty-cart__button"
              >Start shopping</SfButton
            >
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

import {
  SfProductCardHorizontal,
  SfButton,
  SfImage,
  SfHeading,
  SfBreadcrumbs,
} from '@storefront-ui/vue'
export default {
  name: 'DetailedCart',
  components: {
    SfProductCardHorizontal,
    SfBreadcrumbs,
    SfImage,
    SfButton,
    SfHeading,
  },
  data() {
    return {
      breadcrumbs: [
        {
          text: 'Home',
          route: {
            link: '#',
          },
        },
        {
          text: 'Wishlist',
          route: {
            link: '#',
          },
        },
      ],
      configuration: [
        { name: 'Size', value: 'XS' },
        { name: 'Color', value: 'White' },
      ],
      description:
        'Find stunning women cocktail and party dresses. Stand out in lace and metallic cocktail dresses and party dresses from all your favorite brands.',

      shippingMethods: [
        {
          isOpen: false,
          price: 'Free',
          delivery: 'Delivery from 3 to 7 business days',
          label: 'Pickup in the store',
          value: 'store',
          description:
            'Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted.',
        },
        {
          isOpen: false,
          price: '$15.90',
          delivery: 'Delivery from 4 to 6 business days',
          label: 'Delivery to home',
          value: 'home',
          description:
            'Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted.',
        },
        {
          isOpen: false,
          price: '$9.90',
          delivery: 'Delivery from 4 to 6 business days',
          label: 'Paczkomaty InPost',
          value: 'inpost',
          description:
            'Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted.',
        },
        {
          isOpen: false,
          price: '$11.00',
          delivery: 'Delivery within 48 hours',
          label: '48 hours coffee',
          value: 'coffee',
          description:
            'Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted.',
        },
        {
          isOpen: false,
          price: '$14.00',
          delivery: 'Delivery within 24 hours',
          label: 'Urgent 24h',
          value: 'urgent',
          description:
            'Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted.',
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['getUser', 'getWishlist']),
  },
  watch: {
    /* TODO: look for better solution */
    /* another solution is to populate wishlist when you get user on layout page. but then you removing necessity to hit wishlist page to population */
    /* solution is use layout to populate and if router is /wishlist then populate whishlist */
    /* when wishlist page refreshed user will be undefined because we will get it with jwt from server. and you can't populate wishlist because it uses property of user. so watch it to be defined from undefined */
    async getUser(newValue, oldValue) {
      if (newValue) {
        await this.$store.dispatch('populateWishlist')
      }
    },
  },
  async mounted() {
    if (this.getUser) {
      /* if user cames from other pages populate not called with watch because user didn't change */
      await this.$store.dispatch('populateWishlist')
    }
  },
  methods: {
    removeHandler(product) {
      const products = [...this.products]
      this.products = products.filter((element) => element.id !== product.id)
    },

    ...mapActions([
      'removeFromWishlist', // also supports payload `this.nameOfAction(amount)`
    ]),
  },
}
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';
#detailed-cart {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1272px;
    margin: 0 auto;
    padding: 0 var(--spacer-sm);
  }
}
.breadcrumbs {
  padding: var(--spacer-base) 0;
}
.detailed-cart {
  &__main {
    padding: 0 var(--spacer-sm);
    @include for-desktop {
      padding: 0;
    }
  }
  &__aside {
    box-sizing: border-box;
    width: 100%;
    background: var(--c-light);
    padding: var(--spacer-base) var(--spacer-sm);
  }
  @include for-desktop {
    display: flex;
    &__main {
      flex: 1;
    }
    &__aside {
      flex: 0 0 26.8125rem;
      order: 1;
      margin: 0 0 0 var(--spacer-xl);
      padding: var(--spacer-xl);
    }
  }
}
.collected-product {
  --collected-product-padding: var(--spacer-sm) 0;
  --collected-product-actions-display: flex;
  border: 1px solid var(--c-light);
  border-width: 1px 0 0 0;
  &:first-of-type {
    border-top: none;
  }
  &__properties {
    --property-value-font-weight: var(--font-weight--normal);
    margin: var(--spacer-sm) 0 0 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    flex: 2;
  }
  @include for-mobile {
    --collected-product-remove-bottom: var(--spacer-sm);
  }
  @include for-desktop {
    --collected-product-padding: var(--spacer-lg) 0;
  }
}
.actions {
  &__button {
    display: block;
    margin: 0 0 var(--spacer-xs) 0;
    color: var(--c-text);
    &:hover {
      color: var(--c-text-muted);
    }
  }
  &__description {
    font-family: var(--font-family--primary);
    font-size: var(--font-size--sm);
    font-weight: var(--font-weight--light);
    color: var(--c-text-muted);
    position: absolute;
    bottom: 0;
    padding-bottom: var(--spacer-lg);
  }
}
.empty-cart {
  --heading-title-color: var(--c-primary);
  --heading-title-margin: 0 0 var(--spacer-base) 0;
  --heading-description-margin: 0 0 var(--spacer-xl) 0;
  --heading-title-font-weight: var(--font-weight--semibold);
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: column;
  &__image {
    --image-width: 13.1875rem;
    margin: var(--spacer-2xl) 0;
  }
  @include for-desktop {
    &__image {
      --image-width: 22rem;
    }
    &__button {
      --button-width: 20.9375rem;
    }
  }
}
</style>
