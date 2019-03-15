<template>
  <card>
    <div>
      <div class="row">
        <div class="col-5" v-if="$slots.header">
          <slot name="header"/>
        </div>
        <div class="col-7" v-if="$slots.content">
          <slot name="content"/>
        </div>
      </div>
      <div v-if="$slots.footer">
        <hr>
        <slot name="footer"/>
      </div>
    </div>

  </card>
</template>
<script>
import Card from './Card.vue'

export default {
  name: 'StatsCard',
  components: {
    Card
  }
}
</script>
<style>
</style>
