<template>
  <div class="container">
    <div class="autocomplete-wrapper">
      <ais-instant-search :search-client="searchClient" index-name="l2d_driving_schools">
        <ais-autocomplete>
          <div slot-scope="{ currentRefinement, indices }">
            <label class="label-where">Wo</label>
            <label class="label-where-desc">Befindet sich deine Fahrschule?</label>
            <input
              class="form-control"
              type="search"
              :value="value"
              placeholder=""
              @input="updateValue($event.currentTarget.value)"
            >
            <div v-if="currentRefinement">
              <div v-for="index in indices" :key="index.label">
                <ul class="list">
                  <li v-for="hit in index.hits" :key="hit.id">
                    <nuxt-link :to="'/drivingschools/' + hit.id">
                      <ais-highlight attribute="title" :hit="hit"/>
                    </nuxt-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </ais-autocomplete>
      </ais-instant-search>
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
            apiKey: 'GX0FH177R0',
            appId: 'ba5de1e2d183ae288aab3c8fc79d173c'
        }
    },
    mounted() {
        // import 'instantsearch.css/themes/algolia.css';
        const searchClient = algoliasearch(
            this.apiKey,
            this.appId
        )

        this.placesAutocomplete = places({
            apiKey: this.apiKey,
            appId: this.appId,
            language: 'de',
            countries: ['AT'],
            type: 'city'
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
