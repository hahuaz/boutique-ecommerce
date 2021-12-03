<template>
  <div>
    <p @click="openLoading">open loading</p>
  </div>
</template>

<script>
import {} from '@storefront-ui/vue'
export default {
  components: {},
  data() {
    return {}
  },
  methods: {
    openLoading() {
      this.$nuxt.$loading.start()
    },
  },
}
</script>

<style lang="scss" scoped>
.account__dropdown {
}
</style>
