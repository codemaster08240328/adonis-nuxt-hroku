import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _64af2ae3 = () => interopDefault(import('../resources/pages/about.vue' /* webpackChunkName: "pages/about" */))
const _189c476a = () => interopDefault(import('../resources/pages/dashboard.vue' /* webpackChunkName: "pages/dashboard" */))
const _4e0ea8bf = () => interopDefault(import('../resources/pages/login.vue' /* webpackChunkName: "pages/login" */))
const _2cf6f029 = () => interopDefault(import('../resources/pages/posts.vue' /* webpackChunkName: "pages/posts" */))
const _5a3843bd = () => interopDefault(import('../resources/pages/register.vue' /* webpackChunkName: "pages/register" */))
const _23f7f5c5 = () => interopDefault(import('../resources/pages/search/index.vue' /* webpackChunkName: "pages/search/index" */))
const _eeb48ddc = () => interopDefault(import('../resources/pages/searchAlgoliaDefault.vue' /* webpackChunkName: "pages/searchAlgoliaDefault" */))
const _8c793bb8 = () => interopDefault(import('../resources/pages/searchBackup.vue' /* webpackChunkName: "pages/searchBackup" */))
const _dee4810c = () => interopDefault(import('../resources/pages/searchOnlyPlaces.vue' /* webpackChunkName: "pages/searchOnlyPlaces" */))
const _7ddc129c = () => interopDefault(import('../resources/pages/searchVuetify.vue' /* webpackChunkName: "pages/searchVuetify" */))
const _6c5e4044 = () => interopDefault(import('../resources/pages/users.vue' /* webpackChunkName: "pages/users" */))
const _4153879d = () => interopDefault(import('../resources/pages/drivingschools/_id.vue' /* webpackChunkName: "pages/drivingschools/_id" */))
const _781261ca = () => interopDefault(import('../resources/pages/route/_id.vue' /* webpackChunkName: "pages/route/_id" */))
const _04c4a33d = () => interopDefault(import('../resources/pages/search/_city.vue' /* webpackChunkName: "pages/search/_city" */))
const _f731f4b0 = () => interopDefault(import('../resources/pages/index.vue' /* webpackChunkName: "pages/index" */))
const _52ec3ccd = () => interopDefault(import('../resources/pages/___index.vue' /* webpackChunkName: "pages/___index" */))

Vue.use(Router)

if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise((resolve) => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}

export function createRouter() {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,

    routes: [{
      path: "/about",
      component: _64af2ae3,
      name: "about"
    }, {
      path: "/dashboard",
      component: _189c476a,
      name: "dashboard"
    }, {
      path: "/login",
      component: _4e0ea8bf,
      name: "login"
    }, {
      path: "/posts",
      component: _2cf6f029,
      name: "posts"
    }, {
      path: "/register",
      component: _5a3843bd,
      name: "register"
    }, {
      path: "/search",
      component: _23f7f5c5,
      name: "search"
    }, {
      path: "/searchAlgoliaDefault",
      component: _eeb48ddc,
      name: "searchAlgoliaDefault"
    }, {
      path: "/searchBackup",
      component: _8c793bb8,
      name: "searchBackup"
    }, {
      path: "/searchOnlyPlaces",
      component: _dee4810c,
      name: "searchOnlyPlaces"
    }, {
      path: "/searchVuetify",
      component: _7ddc129c,
      name: "searchVuetify"
    }, {
      path: "/users",
      component: _6c5e4044,
      name: "users"
    }, {
      path: "/drivingschools/:id?",
      component: _4153879d,
      name: "drivingschools-id"
    }, {
      path: "/route/:id?",
      component: _781261ca,
      name: "route-id"
    }, {
      path: "/search/:city",
      component: _04c4a33d,
      name: "search-city"
    }, {
      path: "/",
      component: _f731f4b0,
      name: "index"
    }, {
      path: "/:__index",
      component: _52ec3ccd,
      name: "__index"
    }],

    fallback: false
  })
}
