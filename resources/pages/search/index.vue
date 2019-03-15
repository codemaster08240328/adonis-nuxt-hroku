<template>
  <div class="container">

    <div style="padding-bottom: 20vh"></div>

    <div class="autocomplete-wrapper2">
      <div class="ais-InstantSearch2">
        <div class="ais-Autocomplete">
          <label class="label-where">Wo</label>
          <label class="label-where-desc">Befindet sich deine Fahrschule?</label>
          <places
            :type="type"
            :api-key="apiKey"
            :app-id="appId"
            :key="`${appId}-${apiKey}`"
            @change="onChange"
          ></places>
        </div>
      </div>
    </div>

    <div style="padding-bottom: 20vh"></div>

    <div class="center">
      <div class="section-title">
        <div class="center">
          <h2>Fahrschulen in Österreich vorgestellt</h2>
          <h3 class="subtitle">Überblick</h3>
        </div>
      </div>
      <!--end section-title-->
    </div>


    <div class="row">
      <div class="col-md-4" v-for="(number,index) in [0,1,2,3,4,5]" :key="index">
        <div class="item" data-id="1">
          <nuxt-link :to="'/dashboard/'">
            <div class="description">
              <figure>lorem ipsum</figure>
              <div class="label label-default">Fahrschule</div>
              <h3>Fahrschule Aspang</h3>
              <h4>63 Birch Street</h4>
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



  </div>
</template>
<script>
import algoliasearch from 'algoliasearch/lite'
import { placesAutocompleteDataset } from 'places.js'

// import 'instantsearch.css/themes/algolia.css';
// const searchClient = algoliasearch(
//     'GX0FH177R0',
//     'ba5de1e2d183ae288aab3c8fc79d173c'
// )

export default {
    data() {
        return {
            searchClient: undefined,
            appId: 'plKI1JVYGRW7',
            apiKey: '948c690d82461fc0411faa5287f5c977',
            type: 'city',
            suggestion: undefined,
            latlng: {
                lat: 48.8566,
                lng: 2.34287
            }
        }
    },
    mounted() {
        // let placesDataset = placesAutocompleteDataset({
        //     appId: 'plKI1JVYGRW7',
        //     apiKey: '948c690d82461fc0411faa5287f5c977',
        //     algoliasearch: algoliasearch
        // })
    },
    methods: {
        onChange(e) {
            this.suggestion = e.suggestion
            console.debug(this.suggestion)
            this.$router.push(`/search/${encodeURIComponent(this.suggestion.name)}?geo=${this.suggestion.latlng.lat+','+this.suggestion.latlng.lng}`)
        }
    }
}
</script>
