import { configureStore } from '@reduxjs/toolkit'

import driversReducer from './features/driversSlice'

console.log("Starting store configuration...")

export const store = configureStore({
    reducer: {
        drivers: driversReducer
    }
})

console.log("Store configured.")

export default store
export type RootState = ReturnType<typeof store.getState>