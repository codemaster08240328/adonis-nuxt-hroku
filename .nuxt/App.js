import Vue from 'vue'
import NuxtLoading from './components/nuxt-loading.vue'

import '../resources/assets/styles/main.scss'

import '../resources/assets/icons/nucleo-icons.css'

import '../node_modules/leaflet/dist/leaflet.css'

import _ea8ff112 from '../resources/layouts/dashboard/_TopNavbar.vue'
import _2c2f82b0 from '../resources/layouts/dashboard/Content.vue'
import _59c77b3a from '../resources/layouts/dashboard/ContentFooter.vue'
import _7b620c92 from '../resources/layouts/dashboard/MobileMenu.vue'
import _121df034 from '../resources/layouts/dashboard/TopNavbar.vue'
import _6f6c098b from '../resources/layouts/default.vue'

const layouts = { "_dashboard/_TopNavbar": _ea8ff112,"_dashboard/Content": _2c2f82b0,"_dashboard/ContentFooter": _59c77b3a,"_dashboard/MobileMenu": _7b620c92,"_dashboard/TopNavbar": _121df034,"_default": _6f6c098b }

export default {
  head: {"title":"l2d-nuxt","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":"My impeccable Nuxt.js project"}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.ico"}],"style":[],"script":[]},

  render(h, props) {
    const loadingEl = h('nuxt-loading', { ref: 'loading' })
    const layoutEl = h(this.layout || 'nuxt')
    const templateEl = h('div', {
      domProps: {
        id: '__layout'
      },
      key: this.layoutName
    }, [ layoutEl ])

    const transitionEl = h('transition', {
      props: {
        name: 'layout',
        mode: 'out-in'
      },
      on: {
        beforeEnter(el) {
          // Ensure to trigger scroll event after calling scrollBehavior
          window.$nuxt.$nextTick(() => {
            window.$nuxt.$emit('triggerScroll')
          })
        }
      }
    }, [ templateEl ])

    return h('div', {
      domProps: {
        id: '__nuxt'
      }
    }, [
      loadingEl,
      transitionEl
    ])
  },
  data: () => ({
    layout: null,
    layoutName: ''
  }),
  beforeCreate() {
    Vue.util.defineReactive(this, 'nuxt', this.$options.nuxt)
  },
  created() {
    // Add this.$nuxt in child instances
    Vue.prototype.$nuxt = this
    // add to window so we can listen when ready
    if (typeof window !== 'undefined') {
      window.$nuxt = this
    }
    // Add $nuxt.error()
    this.error = this.nuxt.error
  },

  mounted() {
    this.$loading = this.$refs.loading
  },
  watch: {
    'nuxt.err': 'errorChanged'
  },

  methods: {
    errorChanged() {
      if (this.nuxt.err && this.$loading) {
        if (this.$loading.fail) this.$loading.fail()
        if (this.$loading.finish) this.$loading.finish()
      }
    },

    setLayout(layout) {
      if(layout && typeof layout !== 'string') throw new Error('[nuxt] Avoid using non-string value as layout property.')

      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      this.layoutName = layout
      this.layout = layouts['_' + layout]
      return this.layout
    },
    loadLayout(layout) {
      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      return Promise.resolve(layouts['_' + layout])
    }
  },
  components: {
    NuxtLoading
  }
}
