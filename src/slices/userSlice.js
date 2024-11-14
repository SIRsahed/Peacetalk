import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    usersInfo: localStorage.getItem('usersInfo') ? JSON.parse(localStorage.getItem('usersInfo')) : null
  },
  reducers: {
    userLoginInfo: (state, action) => {
      state.usersInfo = action.payload
      localStorage.setItem('usersInfo', JSON.stringify(state.usersInfo))
    }
  }
})

// Action creators are generated for each case reducer function
export const { userLoginInfo } = userSlice.actions

export default userSlice.reducer