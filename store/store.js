import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import notifySlice from './notifySlice'
import chatSlice from './chatSlice'
import usersSlice from './usersSlice'
import messagesSlice from './messagesSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        notify: notifySlice,
        chats: chatSlice,
        users: usersSlice,
        messages: messagesSlice
    }
})