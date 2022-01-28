import { createSlice } from '@reduxjs/toolkit'

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    game : ""
  },
  reducers: {
    setGame: (state, game) => {
      state.game = game.payload
    },
    unsetGame:(state) => {
      state.game = ""
    }
  },
})

export const { setGame, unsetGame} = gameSlice.actions

export default gameSlice.reducer