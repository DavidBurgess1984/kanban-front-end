import { configureStore } from '@reduxjs/toolkit'
import taskReducer from './features/task/taskSlice'
import boardReducer from './features/board/boardSlice'
import themeReducer from './features/theme/themeSlice'
import userReducer from './features/user/userSlice'

export default configureStore({
  reducer: {
    tasks: taskReducer,
    board: boardReducer,
    theme: themeReducer,
    user: userReducer
  },
})