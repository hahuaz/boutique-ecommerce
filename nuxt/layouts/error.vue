<template>
  <div class="p-24">
    <h1>An error occurred</h1>
    <p>Message: {{ error.message }}</p>
    <NuxtLink to="/" class="text-blue-600">Home page</NuxtLink>
  </div>
</template>

<script>
export default {
  layout: 'errorLayout',
  props: ['error'], // you can set a custom layout for the error page
}
</script>
