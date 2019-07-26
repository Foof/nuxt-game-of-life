<template>
  <div class="game-wrapper">
    <table class="shadow mx-auto">
      <tbody>
        <tr v-for="(i, row) in rows" :key="'row-' + i">
          <td v-for="(k, col) in cols" :key="'col-' + k">
            <cell :row="row" :col="col" :active="state[row][col]" @toggle="toggleCell(i, k)" />
          </td>
        </tr>
      </tbody>
    </table>

    <div class="mt-4 text-white">
      <button class="bg-blue-400 hover:bg-blue-600 px-4 py-3 rounded focus:outline-none" @click="toggleStartStop">
        {{ buttonText }}
      </button>
      <button :disabled="inProgress" class="bg-blue-400 hover:bg-blue-600 px-4 py-3 rounded focus:outline-none" @click="clearBoard">
        Clear board
      </button>
      <button :disabled="inProgress" class="bg-blue-400 hover:bg-blue-600 px-4 py-3 rounded focus:outline-none" @click="randomizeBoard">
        Randomize board
      </button>
    </div>
  </div>
</template>

<script>
import store from '../store.js'
import Cell from './Cell.vue'

export default {
  components: {
    Cell
  },

  data () {
    return {
      rows: store.rows,
      cols: store.cols,
      state: store.state,
      inProgress: false,
      interval: false
    }
  },

  computed: {
    buttonText () {
      return this.interval ? 'Stop' : 'Start'
    }
  },

  methods: {
    toggleStartStop () {
      if (this.interval) {
        clearInterval(this.interval)
        this.interval = false
      } else {
        this.interval = setInterval(this.gameTick, 100)
      }
    },

    toggleCell (row, col) {
      const newState = JSON.parse(JSON.stringify(this.state))
      newState[row - 1][col - 1] = !newState[row - 1][col - 1]
      this.state = newState
    },

    gameTick () {
      // Duplicate state
      const newState = JSON.parse(JSON.stringify(this.state))

      // Work out new state
      const rowMaxIndex = this.state.length - 1
      const colMaxIndex = this.state[0].length - 1
      for (let i = 0; i < this.state.length; i++) {
        for (let j = 0; j < this.state[i].length; j++) {
          let aliveNeighbours = 0

          const neighbourIndexes = [
            [(i === 0 ? rowMaxIndex : i - 1), (j === 0 ? colMaxIndex : j - 1)], [(i === 0 ? rowMaxIndex : i - 1), j], [(i === 0 ? rowMaxIndex : i - 1), (j === colMaxIndex ? 0 : j + 1)],
            [i, (j === 0 ? colMaxIndex : j - 1)], false, [i, (j === colMaxIndex ? 0 : j + 1)],
            [(i === rowMaxIndex ? 0 : i + 1), (j === 0 ? colMaxIndex : j - 1)], [(i === rowMaxIndex ? 0 : i + 1), j], [(i === rowMaxIndex ? 0 : i + 1), (j === colMaxIndex ? 0 : j + 1)]
          ]

          neighbourIndexes.forEach((neighbour) => {
            if (neighbour && this.state[neighbour[0]][neighbour[1]]) { aliveNeighbours++ }
          })

          newState[i][j] = this.state[i][j] ? (aliveNeighbours >= 2 && aliveNeighbours <= 3) : (aliveNeighbours === 3)
        }
      }

      this.state = newState
    },

    clearBoard () {
      if (this.inProgress) { return }

      this.state = store.createEmptyBoard()
    },

    randomizeBoard () {
      if (this.inProgress) { return }

      this.state = store.createRandomizedBoard()
    }
  }
}
</script>

<style>
.game-wrapper table {
    height: 900px;
    width: 900px;
}

.game-wrapper a {
    display: block;
    height: 100%;
    background-color: #EEE;
}

.game-wrapper a:hover {
    background-color: #CCC;
}

.game-wrapper a.active {
    background-color: #666;
}

.game-wrapper a.active:hover {
    background-color: #444;
}
</style>
