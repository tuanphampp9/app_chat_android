import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: null,
        userData: null,
        didTryAutoLogin: false
    },
    reducers: {
        getInfoUser: (state, action) => {
            const { userData } = action.payload;
            state.userData = userData
        },
        authenticate: (state, action) => {
            const { token } = action.payload;
            state.token = token
            state.didTryAutoLogin = true;
        },
        setDidTryAutoLogin: (state, action) => {
            state.didTryAutoLogin = action.payload
        },
        logout: (state, action) => {
            state.token = null;
            state.userData = null;
            state.didTryAutoLogin = false;
        },
        updateLoggedUserData: (state, action) => {
            state.userData = { ...state.userData, ...action.payload.newData }
        }
    }
})

export const getInfoUser = authSlice.actions.getInfoUser
export const authenticate = authSlice.actions.authenticate
export const setDidTryAutoLogin = authSlice.actions.setDidTryAutoLogin
export const logout = authSlice.actions.logout
export const updateLoggedUserData = authSlice.actions.updateLoggedUserData
export default authSlice.reducer