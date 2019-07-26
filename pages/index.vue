<template>
  <div class="container mb-12">
    <game-of-life />
  </div>
</template>

<script>
import GameOfLife from '../components/GameOfLife.vue'

export default {
  components: {
    GameOfLife
  }
}
</script>

<style>
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
</style>
