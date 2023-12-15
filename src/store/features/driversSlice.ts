import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from "../Store"
import { Driver } from 'Database'

export const driverAdapter = createEntityAdapter<Driver>({
  sortComparer: (a,b) => a.position - b.position
})

const driversSlice = createSlice({
  name: 'drivers',
  initialState: driverAdapter.getInitialState(),
  reducers: {
    addDriver: driverAdapter.addOne,
    addDrivers: driverAdapter.addMany,
    setDrivers: driverAdapter.setAll,
    updateTotalDistance(state, action) {
      driverAdapter.updateOne(state, {id: action.payload.id, changes: {totalDistance: action.payload.totalDistance}})
    },
    overtake(state, action: PayloadAction<{id: number}>) {
      const driver = state.entities[action.payload.id]
      if(driver != undefined)
      driverAdapter.updateOne(state, {id: action.payload.id, changes: {previousPosition: driver.position--}})
    },
    getOvertaken(state, action) {
      const driver = state.entities[action.payload.id]
      if(driver != undefined)
      driverAdapter.updateOne(state, {id: action.payload.id, changes: {previousPosition: driver.position++}})
    },
    updateGap(state, action) {
      driverAdapter.updateOne(state, {id: action.payload.id, changes: {gap: action.payload.gap}})
    },
    updateLeader(state, action) {
      driverAdapter.updateOne(state, {id: action.payload.id, changes: {leader: action.payload.leader}})
    }
  }
})
  
export const { addDriver, addDrivers, setDrivers, updateTotalDistance, overtake, getOvertaken, updateGap, updateLeader} = driversSlice.actions
export const driversSelectors = driverAdapter.getSelectors((state : RootState) => state.drivers)
export default driversSlice.reducer