import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isConnected: false,
    user : {
      email: "",
      pseudo: "",
      roles: []
    }
  },
  reducers: {
    setConnected: (state) => {
      state.isConnected = true
    },
    setDisconnected: (state) => {
      state.isConnected = false
    },
    setUserEmail: (state, email) => {
      state.user.email = email.payload
    },
    setUserPseudo: (state, pseudo) => {
      state.user.pseudo = pseudo.payload
    },
    setUserRoles: (state, roles) => {
      state.user.roles = roles.payload
    },
    unsetUser:(state) => {
      state.user = {
        email : "",
        pseudo: "",
        roles: []
      }
    }
  },
})

export const { setConnected, setDisconnected,setUserEmail, setUserPseudo, unsetUser,setUserRoles} = userSlice.actions

export default userSlice.reducer