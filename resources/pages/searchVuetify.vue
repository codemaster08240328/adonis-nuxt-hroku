<template>
  <div class="container">
    <div class="autocomplete-wrapper">
      <algolia-places :client-options="{
        apiKey: 'GX0FH177R0',
        appId: 'ba5de1e2d183ae288aab3c8fc79d173c'}" v-model="place" />
    </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            place: {}
        }
    }
}
</script>
