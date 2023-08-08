import { configureStore } from '@reduxjs/toolkit'

import driversReducer from './features/driversSlice'

export default configureStore({
    reducer: {
        drivers: driversReducer
    }
})