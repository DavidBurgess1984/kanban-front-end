import { createSlice } from '@reduxjs/toolkit'

export const navigationSlice = createSlice({
    name:'navigation',
    initialState:{
        isVisible:false,
    },
    reducers:{
        toggleNavigationVisible: (state,action) => {
            state.isVisible  = action.payload.isVisible
        },

    }
})

export const {toggleNavigationVisible} = navigationSlice.actions

export default navigationSlice.reducer