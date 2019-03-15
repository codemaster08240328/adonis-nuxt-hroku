<template>
  <div class="page-wrapper">
      <top-navbar />
      <dashboard-content/>
  </div>
</template>
<script>
//import SideBar from '~/components/SidebarPlugin/SideBar.vue'
//import SidebarLink from '~/components/SidebarPlugin/SidebarLink.vue'
//import SidebarPlugin from "./SidebarPlugin/index";
import TopNavbar from './dashboard/TopNavbar.vue'
import DashboardContent from './dashboard/Content.vue'

export default {
head: {
	bodyAttrs: {
		class: 'sidebar-mini white-content'
    }
},
  components: {
    //SideBar,
    //SidebarLink,
    TopNavbar,
    DashboardContent
  },
  mounted() {
    this.$watch('$route', this.disableRTL, { immediate: true })
    this.$watch('$sidebar.showSidebar', this.toggleNavOpen)
  },
  methods: {
    disableRTL() {
      if (!this.$rtl.isRTL) {
        this.$rtl.disableRTL()
      }
    },
    toggleNavOpen() {
      let root = document.getElementsByTagName('html')[0]
      root.classList.toggle('nav-open')
    }
  }
}
</script>


