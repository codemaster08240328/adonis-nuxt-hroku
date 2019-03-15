<template>
  <div class="row">
    <div class="col-lg-8">
      <div class="card">
        <div class="card-header mb-5">
          <h5 class="card-category">Strecken</h5>
          <h3 class="card-title">Aspang 1</h3>
        </div>
        <div class="card-body">
          <map-l2d></map-l2d>
        </div>
      </div><!-- end card -->
    </div>
    <div class="col-lg-4">
      <div class="card">
        <div class="card-header mb-5">
          <h5 class="card-category">Strecken</h5>
          <h3 class="card-title">Aspang 1</h3>
        </div>
        <div class="card-body">
          <div class="map-sidebar">
            <div class="entries">
              <div class="entry" v-for="info in infos" :key="info.title">
                {{ info.title }}
              </div>
            </div>
          </div>
        </div>
      </div><!-- end card -->
    </div><!-- col-lg-4 -->
  </div><!-- row -->
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
    components: {
        Logo
    },
    fetch({ store }) {
        return store.dispatch('mapinfo/fetchInfoList')
    },
    computed: {
        enableRTL() {
            return this.$route.query.enableRTL
        },
        isRTL() {
            return this.$rtl.isRTL
        },
        infos() {
            return this.$store.state.mapinfo.infos
        }
    },
    mounted() {
        this.i18n = this.$i18n
    }
}
</script>

<style>
.container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system,
        BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
        sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
}

.subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
}

.links {
    padding-top: 15px;
}
</style>
