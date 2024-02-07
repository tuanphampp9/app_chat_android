import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import notifySlice from './notifySlice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        notify: notifySlice
    }
})