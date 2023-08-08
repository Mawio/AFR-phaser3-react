import { createSlice } from '@reduxjs/toolkit'

const initialState = [
    {name: 'Waka', distance: 0},
    {name: 'Savoca', distance: 0}
]

const driversSlice = createSlice({
  name: 'drivers',
  initialState,
  reducers: {
    update(state, action) {
      state = state.map(el => el.name === action.payload.name ? action.payload : el)
    }
  }
})
  
export const { update } = driversSlice.actions
export default driversSlice.reducer