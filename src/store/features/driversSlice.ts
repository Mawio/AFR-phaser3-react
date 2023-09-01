import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { RootState } from "../Store"

export type Driver = {id: number, name: string, position: number, previousPosition: number, distance: number, totalDistance: number, gap: number, leader: number, fastestLap: number}

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
    overtake(state, action) {
      driverAdapter.updateOne(state, {id: action.payload.id, changes: {previousPosition: state.entities[action.payload.id].position--}})
      //driverAdapter.updateOne(state, {id: action.payload.id, changes: {position: state.entities[action.payload.id].position}})
    },
    getOvertaken(state, action) {
      driverAdapter.updateOne(state, {id: action.payload.id, changes: {previousPosition: state.entities[action.payload.id].position++}})
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