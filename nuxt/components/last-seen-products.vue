<template>
  <div class="py-12">
    <h1 class="py-12 font-semibold text-4xl text-center font-raleway">
      Last Seen Products
    </h1>
    <SfCarousel
      :settings="{ peek: 16, breakpoints: { 1023: { peek: 0, perView: 2 } } }"
      class="carousel"
    >
      <!-- item goes as default slot -->
      <SfCarouselItem
        v-for="(product, index) in products"
        :key="index"
        class="carousel__item"
      >
        <SfProductCard
          :image="product.image"
          :title="product.title"
          :regular-price="product.price.regular"
          :special-price="product.price.special"
          :score-rating="product.rating.score"
          :max-rating="product.rating.max"
          :is-on-wishlist="product.isOnWishlist"
          :show-add-to-cart-button="true"
          :reviews-count="product.reviews"
          :badge-label="product.badgeLabel"
          :badge-color="product.badgeColor"
          @click:wishlist="toggleWishlist(index)"
        />
      </SfCarouselItem>
    </SfCarousel>
  </div>
</template>

<script>
import { SfCarousel, SfProductCard } from '@storefront-ui/vue'

export default {
  components: {
    SfCarousel,

    SfProductCard,
  },
  data() {
    return {
      products: [
        {
          title: 'Cream Beach Bag',
          image: '/image/product1.png',
          price: { regular: '$ 50.00 ' },
          rating: { max: 5, score: 4 },
          isOnWishlist: true,
          reviews: 8,
          badgeLabel: '',
          badgeColor: 'color-primary',
        },
        {
          title: 'Cream Beach Bag',
          image: '/image/product1.png',
          price: { regular: '$ 50.00 ', special: '$ 25.00 ' },
          rating: { max: 5, score: 4 },
          isOnWishlist: true,
          reviews: 8,
          badgeLabel: '-50%',
          badgeColor: 'color-primary',
        },
        {
          title: 'Cream Beach Bag',
          image: '/image/product1.png',
          price: { regular: '$ 50.00 ' },
          rating: { max: 5, score: 4 },
          isOnWishlist: false,
          reviews: 8,
          badgeLabel: '',
          badgeColor: 'color-primary',
        },
        {
          title: 'Cream Beach Bag',
          image: '/image/product1.png',
          price: { regular: '$ 50.00 ' },
          rating: { max: 5, score: 4 },
          isOnWishlist: false,
          reviews: 8,
          badgeLabel: '',
          badgeColor: 'color-primary',
        },
        {
          title: 'Cream Beach Bag',
          image: '/image/product1.png',
          price: { regular: '$ 50.00 ', special: '$ 45.00' },
          rating: { max: 5, score: 4 },
          isOnWishlist: false,
          reviews: 8,
          badgeLabel: '-10%',
          badgeColor: 'color-primary',
        },
        {
          title: 'Cream Beach Bag',
          image: '/image/product1.png',
          price: { regular: '$ 50.00 ' },
          rating: { max: 5, score: 4 },
          isOnWishlist: false,
          reviews: 8,
          badgeLabel: '',
          badgeColor: 'color-primary',
        },
        {
          title: 'Cream Beach Bag',
          image: '/image/product1.png',
          price: { regular: '$ 50.00 ' },
          rating: { max: 5, score: 4 },
          isOnWishlist: false,
          reviews: 8,
          badgeLabel: '',
          badgeColor: 'color-primary',
        },
        {
          title: 'Cream Beach Bag',
          image: '/image/product1.png',
          price: { regular: '$ 50.00 ' },
          rating: { max: 5, score: 4 },
          isOnWishlist: false,
          reviews: 8,
          badgeLabel: '',
          badgeColor: 'color-primary',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped></style>
