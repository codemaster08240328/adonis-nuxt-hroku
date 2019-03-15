<template>
  <div id="map-wrap" class="map" style="height: 100%">
    <no-ssr>
      <l-map ref="map" :zoom="zoom" :center="center">
        <l-tile-layer :url="url"></l-tile-layer>
        <l-geo-json ref="geojsonlayer"
                    :geojson="routeGeometry.geometry"
                    :options="options"
                    :options-style="styleFunction"
        />
        <l-marker v-for="mark in route.hints" :lat-lng="JSON.parse('['+mark.geometry+']')" :key="mark.id"></l-marker>
      </l-map>
    </no-ssr>
  </div>
</template>
<script>

export default {
    name: 'FullMap',
    props: {
        sidebarSelectedIndex: {
            type: Number,
            default: -1
        },
        routeId: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            zoom: 12,
            url:
                'https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWJvdWNoYXVkIiwiYSI6ImNpdTA5bWw1azAyZDIyeXBqOWkxOGJ1dnkifQ.qha33VjEDTqcHQbibgHw3w',
            center: [47.52702, 16.1864],
            loading: false,
            geojson: null,
            fillColor: '#e4ce7f',
            options: {}
        }
    },
    computed: {
        styleFunction() {
            const fillColor = this.fillColor // important! need touch fillColor in computed for re-calculate when change fillColor
            return () => {
                return {
                    weight: 5,
                    color: '#ff0000',
                    opacity: 1,
                    fillColor: fillColor,
                    fillOpacity: 1
                }
            }
        },
        routeGeometry() {
            return this.$store.state.route.detail.data.geos[0];
        },
        route() {
            return this.$store.state.route.detail.data
        }
    },
    created() {
        // console.debug(this.geojson)
        // this.loading = true
        // this.$axios
        //     .get('http://localhost:3000/geojson/tracks.json')
        //     .then(response => {
        //         this.geojson = response.data
        //         this.loading = false
        //         this.onGeoJsonLoaded(response.data)
        //     })
    },
    mounted() {},
    methods: {
        onGeoJsonLoaded(geojsonlayer) {
            const { mapObject } = this.$refs.map
            const gpxMapObject = this.$refs.geojsonlayer

            //console.debug(this.$refs.geojsonlayer.getBounds())

            mapObject.fitBounds(gpxMapObject.getBounds())
            return true
        }
    }
}
</script>
