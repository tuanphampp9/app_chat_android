import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: null,
        userData: null
    },
    reducers: {
        getInfoUser: (state, action) => {
            const { userData } = action.payload;
            state.userData = userData
        },
        authenticate: (state, action) => {
            const { token } = action.payload;
            state.token = token
        }
    }
})

export const getInfoUser = authSlice.actions.getInfoUser
export const authenticate = authSlice.actions.authenticate
export default authSlice.reducer