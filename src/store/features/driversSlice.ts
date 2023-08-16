import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { RootState } from "../Store"

export type Driver = {id: number, name: string, position: number, distance: number, totalDistance: number}

export const driverAdapter = createEntityAdapter<Driver>({
  sortComparer: (a,b) => a.position - b.position
})

const driversSlice = createSlice({
  name: 'drivers',
  initialState: driverAdapter.getInitialState(),
  reducers: {
    addDriver: driverAdapter.addOne,
    addDrivers: driverAdapter.addMany,
    updateDistance(state, action) {
      driverAdapter.updateOne(state, {id: action.payload.id, changes: {distance: action.payload.distance}})
    }
  }
})
  
export const { addDriver, addDrivers, updateDistance } = driversSlice.actions
export const driversSelectors = driverAdapter.getSelectors((state : RootState) => state.drivers)
export default driversSlice.reducer