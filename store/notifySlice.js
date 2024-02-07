import { createSlice } from '@reduxjs/toolkit'

const notifySlice = createSlice({
    name: "notify",
    initialState: {
        requestFriends: []
    },
    reducers: {
        getInfoRequestFriend: (state, action) => {
            return requestFriends = action.payload
        }
    }
})

export const getInfoRequestFriend = notifySlice.actions.getInfoRequestFriend
export default notifySlice.reducer