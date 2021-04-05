 
import Vue from 'vue' 
import { NuxtConfig } from '@nuxt/types/config'
import { NuxtOptionsHead } from '@nuxt/types/config/head'
import colors from 'vuetify/es5/util/colors';
import dataLanguages, { defaultLocale } from './data/languages'
import { ILanguage } from '~/interfaces/language'
// const envMode = process.env.MODE as NuxtConfig['mode'] || 'universal'
const envRouterBase = process.env.ROUTER_BASE || '/'
console.log('envRouterBase :>> ', envRouterBase);
const envMode = process.env.MODE  as NuxtConfig['mode'] || 'universal' 
const theme = {
  primary: "#0984e3",
  secondary: "#9C27b0",
  accent: "#e91e63",
  info: "#00CAE3",
  success: "#263238",
  warning: "#FB8C00",
  error: "#FF5252"
};
const config: NuxtConfig = {
  // Global page headers: https://go.nuxtjs.dev/config-head.
  env: {
    routerBase: envRouterBase,
    // baseUrl: "http://0.0.0.0:3000"
  },
  server: {
    host: '0.0.0.0' // default: localhost
  },
  mode: envMode,
  head: function(this: Vue) {
    let currentLanguage: ILanguage | null = null;
    const links = [];
    if (this.$store) {
      const allLanguages = this.$store.getters["locale/all"];
      const defaultLanguage = this.$store.getters["locale/default"];
      currentLanguage = this.$store.getters["locale/language"];

      let path = this.$route.fullPath;

      if (this.$route.params.lang) {
        path = path.substr(this.$route.params.lang.length + 2);
      } else {
        path = path.substr(1);
      }

      for (const language of allLanguages) {
        let langPath = path;

        if (language.locale === defaultLanguage.locale) {
          langPath = `/${langPath}`;
        } else {
          langPath = `/${language.locale}/${langPath}`;
        }

        links.push({
          rel: "alternate",
          hreflang:
            language.locale === defaultLanguage.locale
              ? "x-default"
              : language.locale,
          href: this.$url.img(langPath)
        });
      }
    }

    const options: NuxtOptionsHead = {
      title: process.env.npm_package_name || "",
      titleTemplate(titleChunk: string) {
        return titleChunk ? `${titleChunk} — WebyCom` : "WebyCom";
      },
      htmlAttrs: {
        lang: currentLanguage?.locale!,
        // Value of HTML dir attribute: <html dir="...">
        dir: currentLanguage?.direction!
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" }
      ],
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: `${process.env.routerBase}favicon.png`
        },
        // fonts
        {
          rel: "stylesheet",
          href:
            "https://fonts.googleapis.com/css?family=Roboto:400,400i,500,500i,700,700i"
        },
        ...links
      ]
    };

    return options;
  } as NuxtOptionsHead,

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "@mdi/font/css/materialdesignicons.css",
    "~/assets/overrides.sass",
    "sweetalert2/src/sweetalert2.scss",
    // "~/assets/variables.scss",
    "chartist/dist/chartist.min.css"
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/url.ts",
    "~/plugins/i18n.ts",
    "~/plugins/axios-accessor.ts",
    { src: "~/plugins/local-storage.ts", ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/auth-next"
    // 'nuxt-i18n'
  ],
  auth: {
    redirect: {
      login: "/",
      home: "/",
      logout: "/login"
    },
    strategies: {
      local: {
        token: {
          property: "token",
          required: true,
          type: "Bearer"
        },
        user: {
          property: "user"
          // autoFetch: true
        },
        endpoints: {
          login: { url: "/login", method: "post" },
          logout: { url: "/logout", method: "post" },
          user: { url: "/users/profile", method: "post" }
        }
      }
    }
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    breakpoint: { mobileBreakpoint: 960 },
    icons: {
      values: { expand: "mdi-menu-down" }
    },
    theme: {
      themes: {
        dark: theme,
        light: theme
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  router: {
    base: envRouterBase,
    middleware: "i18n",
    extendRoutes(routes: any) {
      routes.slice().forEach((route: any) => {
        const langRoute = {
          name: `lang-${route.name}`,
          path: `/:lang${route.path}`,
          component: route.component,
          chunkName: route.chunkName
            ? route.chunkName.replace(/^pages\/(.+)$/, "pages/_lang/$1")
            : undefined
        };

        routes.push(langRoute);
      });
    }
  },
  generate: {
    routes() {
      const urls: string[] = [];

      dataLanguages.forEach(lang => {
        if (lang.locale !== defaultLocale) {
          urls.push(`/${lang.locale}/`);
        }
      });

      return urls;
    }
  }
};
export default config