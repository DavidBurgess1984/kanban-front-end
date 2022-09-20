import { createSlice } from '@reduxjs/toolkit'

export const lightboxSlice = createSlice({
    name:'lightbox',
    initialState:{
        isVisible:false,
        content: 'add-task',
        taskId: -1,
    },
    reducers:{
        toggleLightboxVisible: (state,action) => {
            state.isVisible  = action.payload.isVisible
        },
        setLightboxContent:(state,action) => {
            state.content = action.payload.content
        },
        setTaskId:(state,action) => {
            state.taskId = action.payload.id
        }
    }
})

export const {toggleLightboxVisible,setLightboxContent,setTaskId} = lightboxSlice.actions

export default lightboxSlice.reducer