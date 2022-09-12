import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { createTask, deleteTask, editTask } from "../../../app/features/task/taskSlice";
import DeleteTask from "../../../components/lightbox/content/delete-task";

const DeleteTaskContainer = (props) => {

    const dispatch = useDispatch()

    const [taskId,setTaskId] = useState(-1)
    const [taskTitle, setTaskTitle] = useState("")

    const task = useSelector(
        (state) => state.tasks.tasks.filter(task => task.id === props.taskIdDisplaying)
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
        const directClick = true
        props.closeLightBox(e,directClick)
    }

    return (
        <DeleteTask 
            deleteTask={deleteTask}
            title={taskTitle}
            deleteTaskHandler={deleteTaskHandler }
            closeLightBox={props.closeLightBox}
        />
    )
}

export default DeleteTaskContainer