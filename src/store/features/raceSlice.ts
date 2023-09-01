import { createSlice } from "@reduxjs/toolkit"

interface RaceState {
  name: string
}

const initialState = { name: "" } as RaceState

const raceSlice = createSlice({
    name: 'race',
    initialState,
    reducers: {
      setRace(state, action) {
        state.name = action.payload.name
      }
    }
  })

export const { setRace } = raceSlice.actions
export default raceSlice.reducer