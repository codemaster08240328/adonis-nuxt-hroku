<template>
  <!-- container for places.js -->
  <div />
</template>

<script>
import places from 'places.js'

export default {
    props: {
        apiKey: {
            type: String,
            required: false
        },
        appId: {
            type: String,
            required: false
        },
        type: {
            type: String,
            required: false
        },
        aroundRadius: {
            type: Number,
            required: false
        },
        aroundLatLng: {
          type: String,
          required: false
        },
        inputValue: {
            type: String,
            required: false
        }
    },
    data() {
        return { instance: null }
    },
    watch: {
        type(newVal) {
            this.instance.configure({
                type: newVal
            })
        }
    },
    mounted() {
        // make sure Vue does not know about the input
        // this way it can properly unmount
        this.input = document.createElement('input')
        this.$el.appendChild(this.input)

        this.instance = places({
            apiKey: this.apiKey,
            appId: this.appId,
            type: this.type,
            container: this.input,
            aroundLatLng: this.aroundLatLng,
            aroundRadius: this.aroundRadius,
            countries: ['at']
        })

        this.instance.on('change', e => {
            this.$emit('change', e)
        })

        this.instance.setVal(this.inputValue)
    },
    beforeDestroy() {
        //this.instance.off('change')
        this.instance.destroy()
    }
}
</script>
