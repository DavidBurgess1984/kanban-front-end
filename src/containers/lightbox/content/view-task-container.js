import React, {  useState } from "react";

import ViewTask from "../../../components/lightbox/content/view-task";
import { useBoards } from "../../../app/providers/board-provider";
import { useTasks } from "../../../app/providers/task-provider";
import { useLightbox } from "../../../app/providers/lightbox-provider";
import { useTheme } from "../../../app/providers/theme-provider";

const ViewTaskContainer = (props) => {
    
    const [taskDropdownOpen, setTaskDropdownOpen] = useState(false)
    const {boards, activeBoard} = useBoards()
    const {setLightboxContent,taskId} = useLightbox()
    const {tasks,editTaskColumn,editSubtask} = useTasks()
    // const board = useSelector((state) => state.board)
    const {theme} = useTheme()
    let activeBoardData

    boards.forEach((boardData) => {
        if(boardData.id == activeBoard){
            activeBoardData = {...boardData}
        }
    })

    const task = tasks.filter(task => task.id === taskId)[0]

    const statusOptions = activeBoardData.columns.map((column) => {
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

        editSubtask({
            task_id:task.id,
            subtask_id:subtaskId,
            subtask:newSubtask
        })
    }

    const toggleTaskStatus = (columnId) => {
       
        editTaskColumn({
            task_id:task.id,
            column_id:columnId,
        })
    }

    const setTaskEditMode = () => {
        setLightboxContent('edit-task')
    }

    const setTaskDeleteMode = () => {
        setLightboxContent('delete-task')
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
            theme={theme}
            {...props}
        />
    )
}

export default ViewTaskContainer