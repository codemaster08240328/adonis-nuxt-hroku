<template>
  <div class="container">
    <div class="autocomplete-wrapper">
      <ais-instant-search :search-client="searchClient" index-name="l2d_driving_schools">
        <ais-autocomplete>
          <div slot-scope="{ currentRefinement, indices, refine }">
            <label class="label-where">Wo</label>
            <label class="label-where-desc">Befindet sich deine Fahrschule?</label>
            <input
              class="form-control"
              type="search"
              :value="currentRefinement"
              placeholder=""
              @input="refine($event.currentTarget.value)"
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
// import 'instantsearch.css/themes/algolia.css';
const searchClient = algoliasearch(
    'GX0FH177R0',
    'ba5de1e2d183ae288aab3c8fc79d173c'
)

export default {
    data() {
        return {
            searchClient
        }
    }
}
</script>
