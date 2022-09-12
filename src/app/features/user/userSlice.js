import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name:'user',
    initialState:{
        "ref" : -1,
        "name" : "",
        "permissions": []
    },
    reducers:{
        setPermissions: (state,action) => {
            state.permissions = action.payload
        },
        setName:(state,action) => {
            state.name = action.payload
        },
        setRef:(state,action) => {
            state.ref = action.payload
        }
    }
})

export const {setPermissions, setName, setRef} = userSlice.actions

export default userSlice.reducer