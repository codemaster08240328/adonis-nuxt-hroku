<template>
  <div class="card" :class="[type && `card-${type}`]">
    <div class="card-image" v-if="$slots.image">
      <slot name="image"/>
    </div>
    <div class="card-header" v-if="$slots.header || title" :class="headerClasses">
      <slot name="header">
        <h4 class="card-title">{{ title }}</h4>
        <p class="card-category" v-if="subTitle">{{ subTitle }}</p>
      </slot>
    </div>
    <div class="card-body" v-if="$slots.default">
      <slot/>
    </div>
    <div class="card-image" v-if="$slots['image-bottom']">
      <slot name="image-bottom"/>
    </div>
    <slot name="raw-content"/>
    <div class="card-footer" :class="footerClasses" v-if="$slots.footer">
      <slot name="footer"/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Card',
  props: {
    title: {
      type: String,
      description: 'Card title'
    },
    subTitle: {
      type: String,
      description: 'Card subtitle'
    },
    type: {
      type: String,
      description: 'Card type (e.g primary/danger etc)'
    },
    headerClasses: {
      type: [String, Object, Array],
      description: 'Card header css classes'
    },
    bodyClasses: {
      type: [String, Object, Array],
      description: 'Card body css classes'
    },
    footerClasses: {
      type: [String, Object, Array],
      description: 'Card footer css classes'
    }
  }
}
</script>
<style>
</style>
