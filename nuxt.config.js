const config = require('./config.js')

export default {
  env: {
    config: config
  },
  server: {
    port: config.PORT // default: 3000
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'CFAN INT222 Integrated Project',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      },
      {
        name: 'format-detection',
        content: 'telephone=no'
      }
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/logo.svg'
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/icon?family=Material+Icons",
      },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~layouts/global.css",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],
  auth: {
    redirect: {
      login: '/signin',
    },
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          required: true,
        },
        user: {
          property: '',
          autoFetch: true
        },
        endpoints: {
          login: {
            url: `${config.BASE_URL}general/login`,
            method: 'post',
          },
          logout: {
            url: `${config.BASE_URL}user/logout`,
            method: 'delete'
          },
          user: {
            url: `${config.BASE_URL}user`,
            method: 'get',
          },
        }
      }
    }
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    credentials: true
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
