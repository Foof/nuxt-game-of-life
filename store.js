const rows = 30
const cols = 30

const createEmptyBoard = () => {
  const state = []
  for (let i = 0; i < rows; i++) {
    state[i] = []
    for (let j = 0; j < cols; j++) {
      state[i][j] = false
    }
  }

  return state
}

const createRandomizedBoard = () => {
  const state = []
  for (let i = 0; i < rows; i++) {
    state[i] = []
    for (let j = 0; j < cols; j++) {
      state[i][j] = !(Math.random() > 0.5)
    }
  }

  return state
}

const state = createEmptyBoard()

export default {
  rows, cols, state, createEmptyBoard, createRandomizedBoard
}
