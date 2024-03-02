import { createSlice } from '@reduxjs/toolkit'

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        storedUsers: {}
    },
    reducers: {
        setStoredUsers: (state, action) => {
            const newUsers = action.payload.newUsers;
            const existingUsers = state.storedUsers;
            const usersArr = Object.values(newUsers);
            for (let i = 0; i < usersArr.length; i++) {
                const userData = usersArr[i];
                existingUsers[userData.userId] = userData;
            }
            state.storedUsers = existingUsers;
        }
    }
})
export const setStoredUsers = usersSlice.actions.setStoredUsers;
export default usersSlice.reducer;