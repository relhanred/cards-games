import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isConnected: false,
  },
  reducers: {
    setConnected: (state) => {
      state.isConnected = true
    },
    setDisconnected: (state) => {
      state.isConnected = false
    },
  },
})

export const { setConnected, setDisconnected} = userSlice.actions

export default userSlice.reducer