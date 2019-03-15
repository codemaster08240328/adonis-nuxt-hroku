<template>
  <div class="container">
    <section class="page-title">
      <h1>Dashboard</h1>
    </section>
    <section>
      <div class="subject-detail">
        <div class="image">
          <div class="bg-transfer" style="background-image: url(https://www.wechselland.at/wp-content/uploads/bfi_thumb/WLZ44_St14-1-3690w27g89krqv4qilpngg.jpg);">
            <img src="https://www.wechselland.at/wp-content/uploads/bfi_thumb/WLZ44_St14-1-3690w27g89krqv4qilpngg.jpg" alt="">
          </div>
        </div>
        <div class="description">
          <section class="name">
            <h3>{{ drivingSchool.title }}</h3>
          </section>
          <!--end social-->
        </div>
        <!--end description-->
      </div>
    </section>
    <section>
      <h2>Meine Strecken</h2>
      <section>
        <div class="row">
          <div class="col-lg-4 result-item" data-id="7" v-for="route in routes" :key="route.title">
              <div class="item" data-id="1">
                  <nuxt-link :to="'/route/' + route.id">
                      <div class="description">
                          <figure>Subtitle</figure>
                          <div class="label label-default">Einfach</div>
                          <h3>{{ route.title }}</h3>
                          <h4>5km</h4>
                      </div>
                      <!--end description-->
                      <div class="image bg-transfer" style="background-image: url(http://www.outdoorblueprint.com/outdoors-101/plan-a-road-trip-route-with-google-maps/step6.png);">
                          <img src="http://www.outdoorblueprint.com/outdoors-101/plan-a-road-trip-route-with-google-maps/step6.png" alt="">
                      </div>
                      <!--end image-->
                  </nuxt-link>
                  <div class="additional-info">

                  </div>
                  <!--end additional-info-->
              </div>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>
<script>
export default {
    computed: {
        drivingSchool() {
            //return this.$store.state.drivingSchool.detail.data
            return {
                title: 'Fahrschule Haltau Aspang'
            }
        },
        routes() {
            //             return this.$store.state.route.list.data

            return [
                {id: 1, title: 'Olbersdorf'},
                {id: 2, title: 'Stadt'},
                {id: 3, title: 'Zöbern'},
            ]
        }
    }
}
</script>
