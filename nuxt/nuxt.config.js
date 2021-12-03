export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  target: 'server',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Boutique - made by Hahuaz',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com/',
        crossorigin: 'anonymous',
      },
      {
        rel: 'preload',
        as: 'style',
        href: 'https://fonts.googleapis.com/css?family=Raleway:300,400,400i,500,600,700|Roboto:300,300i,400,400i,500,700&display=swap',
        crossorigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Raleway:300,400,400i,500,600,700|Roboto:300,300i,400,400i,500,700&display=swap',
        media: 'print',
        onload: "this.media='all'",
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/logo.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@storefront-ui/vue/styles.scss',
    { src: 'element-ui/lib/theme-chalk/index.css' },
    '~/assets/css/main.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/persistedState.client.js' },
    { src: '~plugins/element-ui', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/fontawesome',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios', '@nuxtjs/proxy'],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^@storefront-ui/],
    postcss: {
      plugins: {
        'postcss-custom-properties': false /* storefront gives build error when used with tailwind. to prevent error use this confg. */,
      },
    },
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    },
    Vendor: ['element-ui'],
  },
  fontawesome: {
    icons: {
      solid: ['faEnvelope', 'faUser', 'faHeart', 'faShoppingCart'],
      // regular: [ ... ],
      // light: [ ... ],
      // duotone: [ ... ],
      brands: ['faInstagram', 'faFacebook'],
    },
  },
  /* When running Nuxt.js in SPA mode, only displayed first page load */
  loadingIndicator: {
    name: 'circle',
    color: '#FFA500',
    background: 'white',
  },
  loading: {
    color: 'green',
    height: '5px',
  },

  axios: {
    baseUrl: 'https://hahuaz-dev.ue.r.appspot.com/',
  },

  // proxy: {
  //   '/api/': {
  //     target: 'http://localhost:1337',
  //     pathRewrite: { '^/api/': '' },
  //     changeOrigin: true,
  //   },
  // },
}
