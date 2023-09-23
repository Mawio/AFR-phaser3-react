import { createSlice } from "@reduxjs/toolkit"
import { Race, Weather } from "Database"

const defaultWeather : Weather = { information: "", temperature: 0, trackTemperature: 0 }
const defaultRace : Race = {name: "", currentLap: 0, totalLaps: 0, location: "", series: "", track: "", weather: defaultWeather, week: 0, year: 0}

const initialState = defaultRace as Race

const raceSlice = createSlice({
    name: 'race',
    initialState,
    reducers: {
      setRace(state, action) {
        return action.payload
      },
      updateLap(state, action) {
        state.currentLap = action.payload.currentLap
      }
    }
  })

export const { setRace, updateLap } = raceSlice.actions
export default raceSlice.reducer