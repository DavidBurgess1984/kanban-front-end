import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editSubtask, editTaskColumn } from "../../../app/features/task/taskSlice";
import ViewTask from "../../../components/lightbox/content/view-task";

const ViewTaskContainer = (props) => {

    const activeBoardIndex = useSelector((state) => state.board.activeBoard);
    
    const [taskDropdownOpen, setTaskDropdownOpen] = useState(false)
    const dispatch = useDispatch()
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);
    const board = useSelector((state) => state.board)
    let activeBoard = {...board.boards[activeBoardIndex]};

    const task = useSelector(
        (state) => state.tasks.tasks.filter(task => task.id === props.taskIdDisplaying)
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

    function useOutsideAlerter(ref) {
        useEffect(() => {
          /**
           * Alert if clicked on outside of element
           */
          function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setTaskDropdownOpen(false)
            }
          }
          // Bind the event listener
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref]);
      }

    return (
        <ViewTask 
            task={task} 
            statusOptions={statusOptions} 
            toggleSubtaskStatus={toggleSubtaskStatus} 
            toggleTaskStatus={toggleTaskStatus}
            wrapperRef={wrapperRef}
            taskDropdownOpen={taskDropdownOpen}
            setTaskDropdownOpen={setTaskDropdownOpen}
            {...props}
        />
    )
}

export default ViewTaskContainer