import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { toggleLightboxVisible } from "../../../app/features/lightbox/lightboxSlice";
import { createTask, deleteTask, editTask } from "../../../app/features/task/taskSlice";
import DeleteTask from "../../../components/lightbox/content/delete-task";

const DeleteTaskContainer = (props) => {

    const dispatch = useDispatch()

    const [taskId,setTaskId] = useState(-1)
    const [taskTitle, setTaskTitle] = useState("")
    const theme = useSelector(state => state.theme)
    const lightbox = useSelector((state) => state.lightbox)

    const task = useSelector(
        (state) => state.tasks.tasks.filter(task => task.id === lightbox.taskId)
    )[0]



    useEffect(() => {
        if(typeof task !== 'undefined'){
            setTaskTitle(task.name)
            setTaskId(task.id)
        }
        
    },[task])

  

    const deleteTaskHandler = (e) => {
        e.preventDefault()
        dispatch(deleteTask({id:taskId}))
        // dispatch(toggleLightboxVisible({isVisible:false}))
    }

    const closeLightBox = () => {
        dispatch(toggleLightboxVisible({isVisible:false}))
    }

    return (
        <DeleteTask 
            deleteTask={deleteTask}
            title={taskTitle}
            deleteTaskHandler={deleteTaskHandler }
            closeLightBox={closeLightBox}
            theme={theme.value}
        />
    )
}

export default DeleteTaskContainer