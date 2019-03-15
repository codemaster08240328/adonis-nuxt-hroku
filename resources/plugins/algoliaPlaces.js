import Vue from 'vue'
import AlgoliaPlaces from '@/components/AlgoliaPlaces.vue'

Vue.component('algolia-places', AlgoliaPlaces);

// const install = (Vue, options = {}) => {
//     options = Object.assign({}, defaultOptions, options);
//
//     // Vue.$vuetifyAlgoliaPlacesOptions = options;
//     // Vue.mixin({
//     //     created() {
//     //         this.$vuetifyAlgoliaPlacesOptions = options;
//     //     },
//     // });
//
//     Vue.component('algolia-places', AlgoliaPlaces);
// };
//
// export default install;

