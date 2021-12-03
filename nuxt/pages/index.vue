<template>
  <div class="">
    <SfHero>
      <SfHeroItem
        title="Colorful summer dresses are already in store"
        subtitle="Summer Collection 2021"
        button-text="Learn more"
        background="#ECEFF1"
        image="/image/hero1.png"
      />
      <SfHeroItem
        title="Love it and give more freedom to it"
        subtitle="Summer Collection 2021"
        button-text="Learn more"
        background="#FCE4EC"
        image="/image/hero2.png"
      />
      <SfHeroItem
        title="Shake it untill you make that thing"
        subtitle="Summer Collection 2021"
        button-text="Learn more"
        background="#FCE4EC"
        image="/image/hero3.png"
      />
    </SfHero>
    <SfBannerGrid :banner-grid="2" class="mt-12">
      <template v-for="banner in banners" #[banner.slot]>
        <SfBanner
          :key="banner.slot"
          :link="banner.link"
          target="_blank"
          :title="banner.title"
          :subtitle="banner.subtitle"
          :description="banner.description"
          :button-text="banner.buttonText"
          :image="banner.image"
          :class="banner.class"
          :data-slot="banner.slot"
        />
      </template>
    </SfBannerGrid>
  </div>
</template>
<script>
import { SfHero, SfBannerGrid, SfBanner } from '@storefront-ui/vue'
export default {
  components: {
    SfHero,
    SfBannerGrid,
    SfBanner,
  },
  data() {
    return {
      banners: [
        {
          slot: 'banner-A',
          subtitle: 'Look Strong',
          title: 'Overalls',
          description:
            "Find stunning women's overall dresses and party dresses. Stand out on the all places from all around the world.",
          buttonText: 'Shop',
          image: '/image/banner-a.png',
          class: 'desktop-only',
          link: '/dresses',
        },
        {
          slot: 'banner-B',
          subtitle: 'Look Professional',
          title: 'Classic Dresses',
          description:
            'Find the women inside you then show her to everyone. Shine on your work and glitter on eyes.',
          buttonText: 'Shop',
          image: '/image/banner-b.png',
          class: 'desktop-only',
        },
        {
          slot: 'banner-C',
          description:
            "They're our precious. They are elegant and deserve better.",
          buttonText: 'Pregnant Products',
          image: '/image/banner-c.png',
        },
        {
          slot: 'banner-D',
          subtitle: 'Free Style',
          title: 'Young Products',
          buttonText: 'Go Crazy >> ',

          image: '/image/banner-d.png',
        },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
::v-deep .sf-banner[data-slot='banner-A'] {
  a {
    width: min-content;
    white-space: nowrap;
  }
}
::v-deep .sf-banner[data-slot='banner-B'] {
  background-size: contain;
  background-position: right;
  border: 1px solid rgba(black, 0.7);
}
::v-deep .sf-banner[data-slot='banner-C'] {
  display: grid;
  justify-content: center;
  align-items: flex-end;
  border: 1px solid rgba(black, 0.7);
  p {
    margin-bottom: 10px;
  }
}

::v-deep .sf-banner[data-slot='banner-D'] {
  background-color: #f7f7f7;
  display: grid;
  align-items: flex-end;
}
</style>
