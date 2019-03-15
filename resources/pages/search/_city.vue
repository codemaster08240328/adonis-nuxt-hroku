<template>
  <div class="container">

    <section class="page-title">
      <h1>Suchergebnisse</h1>
    </section>

    <section>
      <div class="hero-search">
        <places
          :type="type"
          :api-key="apiKey"
          :app-id="appId"
          :key="`${appId}-${apiKey}`"
          @change="onChange"
          :input-value="inputValue"
          :around-lat-lng="`${geometry.lat},${geometry.lng}`"
          :around-radius="1000 * 10"
        ></places>
      </div>
    </section>
    <div class="row">
      <div class="col-lg-6">
        <div class="search-results">
          <div class="search-entry item item-row" v-for="ds in drivingSchools" :key="ds.title">
            <a href="#" @click.prevent="showEntry = true">
              <div class="image bg-transfer" :style="{'background-image': 'url(https://www.wechselland.at/wp-content/uploads/bfi_thumb/WLZ44_St14-1-3690w27g89krqv4qilpngg.jpg)'}">
              </div>
              <div class="description">
                <h3>{{ ds.title }}</h3>
                <h4>{{ ds.city }}</h4>
                <div class="label label-default">
                  5 Strecken verfügbar
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="detail-sidebar" v-if="showEntry">
          <section class="shadow">
            <div id="map-detail" class="map height-250px" style="position: relative; overflow: hidden;">
              <no-ssr>
                <l-map ref="map" :zoom="zoom" :center="center">
                  <l-tile-layer :url="url"></l-tile-layer>
                  <l-marker :lat-lng="position"></l-marker>
                </l-map>
              </no-ssr>
            </div>
            <!--end map-->
            <div class="content">
              <div class="vertical-aligned-elements">
                <div class="element2">
                  <h2>Fahrschule Aspang</h2>
                </div>
                <div class="">
                  <nuxt-link class="btn btn-primary btn-rounded btn-xs" :to="'/dashboard'" @click="showEntry = !showEntry">
                    Zur Fahrschule anmelden
                  </nuxt-link>
                  <nuxt-link class="btn btn-primary btn-rounded btn-xs" :to="'/dashboard'" @click="showEntry = !showEntry">
                    Übungsstrecken ansehen
                  </nuxt-link>
                </div>
              </div>
              <hr>
              <address>
                <figure><i class="fa fa-map-marker"></i>3858 Marion Street<br>Morrisville, VT 05661 </figure>
                <figure><i class="fa fa-envelope"></i><a href="#">fahrschule@haltau.at</a></figure>
                <figure><i class="fa fa-phone"></i>+43 2222222</figure>
                <figure><i class="fa fa-globe"></i><a href="#">www.haltau-aspang.at</a></figure>
              </address>
            </div>


          </section>
          <section>
            <h2>Opening Hours</h2>
            <dl>
              <dt>Monday</dt>
              <dd>08:00am - 11:00pm</dd>
              <dt>Tuesday</dt>
              <dd>08:00am - 11:00pm</dd>
              <dt>Wednesday</dt>
              <dd>12:00am - 11:00pm</dd>
              <dt>Thursday</dt>
              <dd>08:00am - 11:00pm</dd>
              <dt>Friday</dt>
              <dd>03:00pm - 02:00am</dd>
              <dt>Saturday</dt>
              <dd>03:00pm - 02:00am</dd>
              <dt>Sunday</dt>
              <dd>Closed</dd>
            </dl>
          </section>
          <section>
            <h2>Share This Listing</h2>
            <div class="social-share jssocials"><div class="jssocials-shares"><div class="jssocials-share jssocials-share-twitter"><a target="_blank" href="https://twitter.com/share?url=http%3A%2F%2Fthemestarz.net%2Fhtml%2Flocations%2Fdetail.html&amp;text=Locations%20-%20Directory%20Listing%20HTML%20Template" class="jssocials-share-link"><i class="fa fa-twitter jssocials-share-logo"></i><span class="jssocials-share-label">Tweet</span></a><div class="jssocials-share-count-box jssocials-share-no-count"><span class="jssocials-share-count"></span></div></div><div class="jssocials-share jssocials-share-facebook"><a target="_blank" href="https://facebook.com/sharer/sharer.php?u=http%3A%2F%2Fthemestarz.net%2Fhtml%2Flocations%2Fdetail.html" class="jssocials-share-link"><i class="fa fa-facebook jssocials-share-logo"></i><span class="jssocials-share-label">Like</span></a><div class="jssocials-share-count-box jssocials-share-no-count"><span class="jssocials-share-count"></span></div></div><div class="jssocials-share jssocials-share-googleplus"><a target="_blank" href="https://plus.google.com/share?url=http%3A%2F%2Fthemestarz.net%2Fhtml%2Flocations%2Fdetail.html" class="jssocials-share-link"><i class="fa fa-google jssocials-share-logo"></i><span class="jssocials-share-label">+1</span></a><div class="jssocials-share-count-box jssocials-share-no-count"><span class="jssocials-share-count"></span></div></div><div class="jssocials-share jssocials-share-linkedin"><a target="_blank" href="https://www.linkedin.com/shareArticle?mini=true&amp;url=http%3A%2F%2Fthemestarz.net%2Fhtml%2Flocations%2Fdetail.html" class="jssocials-share-link"><i class="fa fa-linkedin jssocials-share-logo"></i><span class="jssocials-share-label">Share</span></a><div class="jssocials-share-count-box jssocials-share-no-count"><span class="jssocials-share-count"></span></div></div><div class="jssocials-share jssocials-share-pinterest"><a target="_blank" href="https://pinterest.com/pin/create/bookmarklet/?&amp;url=http%3A%2F%2Fthemestarz.net%2Fhtml%2Flocations%2Fdetail.html&amp;description=Locations%20-%20Directory%20Listing%20HTML%20Template" class="jssocials-share-link"><i class="fa fa-pinterest jssocials-share-logo"></i><span class="jssocials-share-label">Pin it</span></a><div class="jssocials-share-count-box jssocials-share-no-count"><span class="jssocials-share-count"></span></div></div></div></div>
          </section>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import algoliasearch from 'algoliasearch/lite'
import { placesAutocompleteDataset } from 'places.js'

const searchClient = algoliasearch(
    'GX0FH177R0',
    'ba5de1e2d183ae288aab3c8fc79d173c'
)


export default {
    fetch({ store, params }) {
        return Promise.all([store.dispatch('drivingSchool/fetchList')])
    },
    data() {
        return {
            showEntry: false,
            searchClient,
            appId: 'plKI1JVYGRW7',
            apiKey: '948c690d82461fc0411faa5287f5c977',
            type: 'city',
            suggestion: undefined,
            inputValue: undefined,
            geometry: {
                lat: 48.8566,
                lng: 2.34287
            },
            error: '',
            position: L.latLng(47.559002,16.095681),
            zoom: 12,
            center: L.latLng(47.559002,16.095681),
            url:
                'https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWJvdWNoYXVkIiwiYSI6ImNpdTA5bWw1azAyZDIyeXBqOWkxOGJ1dnkifQ.qha33VjEDTqcHQbibgHw3w',
        }
    },
    computed: {
        drivingSchools() {
            console.debug(this.$store.state.drivingSchool.list)
            return this.$store.state.drivingSchool.list.data
        }
    },
    created() {
        this.inputValue = this.$route.params.city

        if(typeof this.$route.query.geo !== 'undefined') {
            let geo = this.$route.query.geo.split(',')
            this.geometry.lat = geo.lat
            this.geometry.lat = geo.lng
        } else {
            this.error = 'latlong missing'
            console.debug(this.error)
        }
    },
    mounted() {},
    methods: {
        onChange(e) {
            this.suggestion = e.suggestion
            this.$router.push(
                `/search/${encodeURIComponent(this.suggestion.name)}?geo=${this
                    .suggestion.latlng.lat +
                    ',' +
                    this.suggestion.latlng.lat}`
            )
        }
    }
}
</script>
