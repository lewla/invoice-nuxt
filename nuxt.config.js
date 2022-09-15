export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  devtools: true,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ko.qa',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }
    ]
  },

  server: {
    host: "0.0.0.0",
    port: 8038
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/_variables.scss',
    '@/assets/css/main.scss'
  ],

  js:[
    '@/assets/js/hammer.min.js'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '~plugins/touch', ssr: false},
    {src: '~/plugins/axios'}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://auth.nuxtjs.org/guide/setup
    '@nuxtjs/auth-next',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    '@nuxtclub/feathericons',
    '@nuxtjs/toast',
    ['nuxt-matomo', { matomoUrl: '//matomo.lew.la/', siteId: 2 }]
  ],

  styleResources: {
    scss: ['./assets/css/*.scss']
  },

  env: {
    apiBaseURL: 'https://mail.ko.qa'
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'https://mail.ko.qa'
  },

  toast: {
    position: 'bottom-right',
    duration: 3500,
    className: 'toast-notification'
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: 'ko.qa invoices'
    }
  },

  router: {
    middleware: ['auth']
  },

  auth: {
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'token',
          maxAge: 900,
          global: true,
          type: 'Bearer'
        },
        refreshToken: {
          property: 'refreshToken',
          data: 'refreshToken',
          maxAge: 60 * 60 * 24 * 90
        },
        user: {
          property: 'user'
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post' },  
          refresh: { url: '/auth/refresh', method: 'post' },
          user: { url: '/v1/users/me', method: 'get' },
          logout: { url: '/auth/logout', method: 'post' }
        }
      }
    },
    redirect: {
      login: '/login',
      logout: '/login',
      home: '/'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: []
  },

  globalName: 'koqa'
}