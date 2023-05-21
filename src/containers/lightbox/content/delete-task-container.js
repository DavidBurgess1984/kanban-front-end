import React, { useEffect, useState } from "react";


import DeleteTask from "../../../components/lightbox/content/delete-task";
import { useTasks } from "../../../app/providers/task-provider";
import { useLightbox } from "../../../app/providers/lightbox-provider";
import { useTheme } from "../../../app/providers/theme-provider";

const DeleteTaskContainer = (props) => {


    // const [taskId,setTaskId] = useState(-1)
    const [taskTitle, setTaskTitle] = useState("")
    const {theme} = useTheme()
    // const lightbox = useSelector((state) => state.lightbox)
    const {toggleLightboxVisible,taskId,setTaskId} = useLightbox()
    const {tasks,editTaskColumn,editSubtask,deleteTaskAction,deleteTask} = useTasks()
    const task = tasks.filter(task => task.id === taskId)[0]



    useEffect(() => {
        if(typeof task !== 'undefined'){
            setTaskTitle(task.name)
            setTaskId(task.id)
        }
        
    },[task])

  

    const deleteTaskHandler = (e) => {
        e.preventDefault()
        deleteTaskAction(taskId)
        toggleLightboxVisible(false)
        // dispatch(toggleLightboxVisible({isVisible:false}))
    }

    const closeLightBox = () => {
        toggleLightboxVisible(false)
    }

    return (
        <DeleteTask 
            // deleteTask={deleteTask}
            title={taskTitle}
            deleteTaskHandler={deleteTaskHandler }
            closeLightBox={closeLightBox}
            theme={theme}
        />
    )
}

export default DeleteTaskContainer