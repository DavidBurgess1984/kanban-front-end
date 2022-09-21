import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLightboxContent } from "../../../app/features/lightbox/lightboxSlice";
import { editSubtask, editTaskColumn } from "../../../app/features/task/taskSlice";
import ViewTask from "../../../components/lightbox/content/view-task";

const ViewTaskContainer = (props) => {
    
    const [taskDropdownOpen, setTaskDropdownOpen] = useState(false)
    const dispatch = useDispatch()
    const board = useSelector((state) => state.board)
    const theme = useSelector(state => state.theme)
    let activeBoard

    board.boards.forEach((boardData) => {
        if(boardData.id == board.activeBoard){
            activeBoard = {...boardData}
        }
    })

    const lightbox = useSelector(state => state.lightbox)


    const task = useSelector(
        (state) => state.tasks.tasks.filter(task => task.id === lightbox.taskId)
    )[0]

    const statusOptions = activeBoard.columns.map((column) => {
        return {
            name: column.name.charAt(0).toUpperCase() + column.name.slice(1),
            value: column.id
        }
    })

    const toggleSubtaskStatus = (subtaskId) => {
        const newTask = {...task}
        let newSubtask = {}
        newTask.subtasks.forEach( (subtask,i) => {
            if(subtask.id == subtaskId){
                newSubtask = {...subtask}
                newSubtask.complete = !subtask.complete

            }

        })

        dispatch(editSubtask({
            task_id:task.id,
            subtask_id:subtaskId,
            subtask:newSubtask
        }))
    }

    const toggleTaskStatus = (columnId) => {
       
        dispatch(editTaskColumn({
            task_id:task.id,
            column_id:columnId,
        }))
    }

    const setTaskEditMode = () => {
        dispatch(setLightboxContent({content:'edit-task'}))
    }

    const setTaskDeleteMode = () => {
        dispatch(setLightboxContent({content:'delete-task'}))
    }

    // return null

    return (
        <ViewTask 
            task={task} 
            statusOptions={statusOptions} 
            toggleSubtaskStatus={toggleSubtaskStatus} 
            toggleTaskStatus={toggleTaskStatus}
            taskDropdownOpen={taskDropdownOpen}
            setTaskDropdownOpen={setTaskDropdownOpen}
            setTaskEditMode={setTaskEditMode}
            setTaskDeleteMode={setTaskDeleteMode}
            theme={theme.value}
            {...props}
        />
    )
}

export default ViewTaskContainer