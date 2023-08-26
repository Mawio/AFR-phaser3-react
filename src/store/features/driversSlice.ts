import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { RootState } from "../Store"

export type Driver = {id: number, name: string, position: number, previousPosition: number, distance: number, totalDistance: number}

export const driverAdapter = createEntityAdapter<Driver>({
  sortComparer: (a,b) => a.position - b.position
})

const driversSlice = createSlice({
  name: 'drivers',
  initialState: driverAdapter.getInitialState(),
  reducers: {
    addDriver: driverAdapter.addOne,
    addDrivers: driverAdapter.addMany,
    updateTotalDistance(state, action) {
      driverAdapter.updateOne(state, {id: action.payload.id, changes: {totalDistance: action.payload.totalDistance}})
    },
    updatePosition(state, action) {
      driverAdapter.updateOne(state, {id: action.payload.id, changes: {previousPosition: state.entities[action.payload.id].position}})
      driverAdapter.updateOne(state, {id: action.payload.id, changes: {position: action.payload.position}})
    }
  }
})
  
export const { addDriver, addDrivers, updateTotalDistance, updatePosition} = driversSlice.actions
export const driversSelectors = driverAdapter.getSelectors((state : RootState) => state.drivers)
export default driversSlice.reducer