<template>
  <div id="page-content">
    <div class="hero-section full-screen has-map has-sidebar"
         :style="{
           'height': `100vh`
    }">
      <div class="map-wrapper" style="height:100%" ref="mapwrapper">
        <full-map :sidebar-selected-index="sidebarSelectedIndex" :route-id="route.id"></full-map>
      </div>

      <div class="results-wrapper">
        <div class="sidebar-detail">
          <div class="tse-scrollable">
            <div class="tse-content">
              <div class="sidebar-wrapper"></div>
              <!--end sidebar-detail-content-->
            </div>
            <!--end tse-content-->
          </div>
          <!--end tse-scrollable-->
        </div>
        <!--end sidebar-detail-->
        <div class="results">
          <div class="tse-scrollable">
            <div class="tse-content">
              <div class="section-title">
                <h2>Hinweise</h2>
              </div>
              <!--end section-title-->
              <div class="results-content">
                <div :id="hint.id"
                     class="result-item"
                     v-for="hint in route.hints"
                     :key="hint.id"
                     @mouseover="sidebarSelectedIndex = parseInt($event.currentTarget.id)">
                  <a href="">
                    <h3>{{ hint.title }}</h3>
                    <div class="result-item-detail">
                      <div class="image" :style="{'background-image': 'url(/media/'+hint.image.url+')'}"></div>
                      <div class="description">
                        {{ hint.description }}
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <!--end results-content-->
            </div>
            <!--end tse-content-->
          </div>
          <!--end tse-scrollable-->
        </div>
        <!--end results-->
      </div>
      <!--end results-wrapper-->
    </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            sidebarSelectedIndex: -1
        }
    },
    fetch({ store, params }) {
        return Promise.all([
            store.dispatch('drivingSchool/fetchDetail', params.id),
            //store.dispatch('mapinfo/fetchInfoList')
            store.dispatch('route/fetchDetail', params.id)
        ])
    },
    computed: {
        drivingSchool() {
            return this.$store.state.drivingSchool.detail.data
        },
        route() {
            return this.$store.state.route.detail.data
        }
    },
    methods: {
        mouseoverSidebarItem(event) {
            console.debug(event.currentTarget.id)
            this.sidebarSelectedIndex = event.currentTarget.id
            this.$emit('sidebarItemMouseOver', this.sidebarSelectedIndex);
        }
    }
}
</script>
