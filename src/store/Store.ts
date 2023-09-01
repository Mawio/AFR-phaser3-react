import { configureStore } from '@reduxjs/toolkit'

import driversReducer from './features/driversSlice'
import raceReducer from './features/raceSlice'

console.log("Starting store configuration...")

export const store = configureStore({
    reducer: {
        drivers: driversReducer,
        race: raceReducer
    }
})

console.log("Store configured.")

export default store
export type RootState = ReturnType<typeof store.getState>