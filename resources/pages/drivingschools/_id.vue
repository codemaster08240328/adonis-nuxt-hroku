<template>
  <div>
    <div class="row">
      <div class="col-lg-4">SIDEBAR

        <div class="sidebar">

          <h1>{{ drivingSchool.title }}</h1>
          <div class="info">
            {{ drivingSchool.address }}<br/>
            {{ drivingSchool.city }} {{ drivingSchool.zip }}
          </div>

        </div>

      </div>
      <div class="col-lg-8">

        <div class="result-item" data-id="7" v-for="route in routes" :key="route.title">
          <div>
            <nuxt-link :to="'/route/' + route.id">
              {{ route.title }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    fetch({ store, params }) {
        return Promise.all([
            store.dispatch('drivingSchool/fetchDetail', params.id),
            store.dispatch('route/fetchList')
        ])
    },
    computed: {
        drivingSchool() {
            return this.$store.state.drivingSchool.detail.data
        },
        routes() {
            return this.$store.state.route.list.data
        }
    }
}
</script>
