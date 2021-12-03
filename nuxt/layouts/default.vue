<template>
  <div class="max-w-7xl mx-auto p-4">
    <c-header></c-header>
    <Nuxt />
    <section>
      <last-seen-products></last-seen-products>
    </section>
    <footer>
      <c-footer></c-footer>
    </footer>
  </div>
</template>
<script>
export default {
  async mounted() {
    if (this.$store.state.jwt && !this.$store.state.user) {
      await this.$store.dispatch('getUser')
    }
  },
}
</script>

<style></style>
