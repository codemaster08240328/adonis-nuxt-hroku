<template>
  <fade-transition :duration="100" mode="out-in">
    <!-- your content here -->
    <div class="main-wrapper">
      <nuxt/>
    </div>
  </fade-transition>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { FadeTransition } from 'vue2-transitions'
export default {
  components: {
    FadeTransition
  },
  computed: {
      ...mapState({
          alert: state => state.alert
      })
  },
  watch: {
      $route (to, from){
          // clear alert on location change
          this.clearAlert();
      }
  } ,
  methods: {
      ...mapActions({
          clearAlert: 'alert/clear' 
      })
  }
}
</script>
