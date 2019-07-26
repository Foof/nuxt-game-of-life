<template>
  <div class="container mx-auto mb-12">
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
