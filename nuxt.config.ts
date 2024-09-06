export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  app: {
    head: {
      title: 'Desserts ecommerce',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Discover delicious dessert recipes, from decadent cakes to creamy cheesecakes and irresistible cookies. Explore a world of sweet treats, baking tips, and dessert inspiration for every occasion!' },
        { name: 'keywords', content: 'dessert recipes, cakes, cookies, waffle, macaron, baklava, pie, Brownie' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' } // Updated favicon path
      ]
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['bootstrap/dist/css/bootstrap.css','bootstrap/dist/css/bootstrap.min.css','~/assets/style/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      scss: {
        implementation: require('sass'),
      },
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/style/_colors.scss";`
        }
      }
    }
  },
  devServer: {
    port: 3000, // default: 3000     
    host: '0.0.0.0', // default: localhost 
  },
  ssr: true,
  compatibilityDate: '2024-09-05'
};