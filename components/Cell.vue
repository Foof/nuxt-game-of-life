<template>
  <a :class="{ active: active }" href="#" :title="`${row} - ${col}`" @click.prevent="toggle" />
</template>

<script>
export default {
  props: {
    row: {
      type: Number,
      required: true
    },
    col: {
      type: Number,
      required: true
    },
    active: Boolean
  },

  methods: {
    toggle () {
      this.$emit('toggle')
    }
  }
}
</script>
