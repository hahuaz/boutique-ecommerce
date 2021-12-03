<template>
  <div class="c-footer text-white py-24 px-12 mt-12">
    <div class="c-footer__container grid grid-cols-4 justify-items-center">
      <div class="c-footer-column space-y-5">
        <h1 class="underline tracking-widest font-bold">ABOUT US</h1>
        <div class="space-y-1">
          <p>Who we are</p>
          <p>Our quality</p>
          <p>Our customers</p>
          <p>Goals</p>
        </div>
      </div>
      <div class="c-footer-column space-y-5">
        <h1 class="underline tracking-widest font-bold">PRODUCTS</h1>
        <div class="space-y-1">
          <p>How we cooperate</p>
          <p>Work with us & Franchise</p>
          <p>Malls</p>
        </div>
      </div>
      <div class="c-footer-column space-y-5">
        <h1 class="underline tracking-widest font-bold">HELP</h1>
        <div class="space-y-1">
          <p>Customer service</p>
          <p>Size guide</p>
          <p>Return Policy</p>
          <p>Contact us</p>
        </div>
      </div>
      <div
        class="c-footer-column grid grid-flow-row justify-around items-center"
      >
        <div class="icons space-x-1">
          <a href="javascript:">
            <font-awesome-icon :icon="['fab', 'instagram']" />
          </a>
          <a href="javascript:">
            <font-awesome-icon :icon="['fab', 'facebook']" />
          </a>
          <a href="javascript:">
            <font-awesome-icon :icon="['fas', 'envelope']" />
          </a>
        </div>
        <span>+0533 666 66 44</span>
        <pre class="whitespace-pre-wrap">
Salem St. Sancaktepe
İstanbul TURKEY</pre
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.c-footer {
  background-color: #1d1f22;
  &__container {
  }
  &-column {
    p {
      font-family: 'Raleway', sans-serif;
      cursor: pointer;
      font-weight: 500;

      &:hover {
        color: var(--c-primary);
      }
    }
    .icons {
      a {
        font-size: 1.3rem;
        padding: 0.2rem 0.6rem;
        background-color: #333232;
        border-radius: 10px;
        transition: all 0.3s;
        &:hover {
          background-color: var(--c-primary);
        }
      }
    }
    .contact {
      font-family: monospace !important;
    }
  }
}
</style>
