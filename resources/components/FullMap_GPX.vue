<template>
  <div id="map-wrap" class="map" style="height: 100%">
    <no-ssr>
      <l-map ref="map" :zoom="zoom" :center="center">
        <l-tile-layer :url="url"></l-tile-layer>
        <l-marker :lat-lng="[47.52702, 16.1864]"></l-marker>
        <l-gpx
                :gpx-file="gpx_file"
                @gpx-loaded="onGpxLoaded" />
      </l-map>
    </no-ssr>
  </div>
</template>
<script>
export default {
    name: 'FullMap',
    props: {
        gpx_file: {
            type: String,
            default: '/gpx/route1.gpx'
        },
        sidebar_selected_index: {
            type: Number,
            default: -1
        }
    },
    data() {
        return {
            zoom: 2,
            center: [0, 0],
            url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
            //url: 'https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
            attribution:
                '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }
    },
    computed: {

    },
    methods: {
        onGpxLoaded(loadedEvent) {
            const { mapObject } = this.$refs.map;
            const gpxMapObject = loadedEvent.target;
            mapObject.fitBounds(gpxMapObject.getBounds());
            return true
        }
    }
}
</script>
