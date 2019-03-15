<template>
  <div class="container">
    <div class="autocomplete-wrapper">
      <div style="padding-top: 10rem"></div>
      <label class="label-where">Wo</label>
      <label class="label-where-desc">Befindet sich deine Fahrschule?</label>
      <span class="algolia-places">
        <input
          id="l2d-search-city"
          class="form-control"
          type="search"
          :value="value"
          @input="updateValue($event.currentTarget.value)"
        >
      </span>
      <span class="ap-dropdown-menu">
        <div>
          <span class="ap-suggestions">
            <div class="ap-suggestion">
              <span class="ap-suggestion-icon"><svg></svg></span>
              <span class="ap-name"></span>
              <span class="ap-address"></span>
            </div>
            <!-- Other suggestions -->
          </span>
        </div>
      </span>
    </div>
  </div>
</template>
<script>
import algoliasearch from 'algoliasearch/lite'
import places from 'places.js'

export default {
    data() {
        return {
            searchClient: {},
            placesAutocomplete: null,
            placesAppId: 'plKI1JVYGRW7',
            placesApiKey: '948c690d82461fc0411faa5287f5c977',
            value: ''
        }
    },
    mounted() {
        // import 'instantsearch.css/themes/algolia.css';
        // const searchClient = algoliasearch(
        //     this.apiKey,
        //     this.appId
        // )

        this.placesAutocomplete = places({
            apiKey: this.placesApiKey,
            appId: this.placesAppId,
            language: 'de',
            countries: ['at'],
            type: 'city',
            container: document.querySelector('#l2d-search-city')
        })

        this.placesAutocomplete.on('change', e => {
            this.$emit('change', e.suggestion)
            this.updateValue(e.suggestion.value)
        })
        this.placesAutocomplete.on('clear', () => {
            this.$emit('change', {})
            this.updateValue(null)
        })
    },
    beforeDestroy() {
        //this.placesAutocomplete.destroy()
    },
    methods: {
        updateValue(value) {
            this.$emit('input', value)
        }
    }
}
</script>
