import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { toggleLightboxVisible } from "../../../app/features/lightbox/lightboxSlice";
import { clearAllTaskErrors, clearTaskError, createTask, createTaskAction, editTask, editTaskAction } from "../../../app/features/task/taskSlice";
import AddTask from "../../../components/lightbox/content/add-task";

const AddTaskContainer = (props) => {

    const dispatch = useDispatch()

    const [taskId,setTaskId] = useState(-1)
    const [title,setTitle] = useState("Add New Task")
    const [saveTaskButtonText,setSaveTaskButtonText] = useState("Create Task")
    const [taskTitle, setTaskTitle] = useState("")
    const [taskDescription, setTaskDescription] = useState("")
    const [subTasks, setSubTasks] = useState([{name:"",complete:false},{name:"",complete:false}])
    const [status,setStatus] = useState(-1)

    const theme = useSelector(state => state.theme)
    const board = useSelector((state) => state.board)
    const lightbox = useSelector((state) => state.lightbox)
    let activeBoard

    board.boards.forEach((boardData) => {
        if(boardData.id == board.activeBoard){
            activeBoard = {...boardData}
        }
    })

    const task = useSelector(
        (state) => state.tasks.tasks.filter(task => task.id === lightbox.taskId)
    )[0]

    const boardTasks = useSelector(
        (state) => state.tasks.tasks.filter(task => task.id === activeBoard.id)
    )

    const errors = useSelector((state) => state.tasks.errors)

    useEffect(() => {
        if(typeof task !== 'undefined'){
            setTaskTitle(task.name)
            setTaskDescription(task.description)
            setSubTasks(task.subtasks)
            setStatus(task.column_id)
            setTitle("Edit Task")
            setSaveTaskButtonText("Save Changes")
            setTaskId(task.id)
        }
        
    },[task])

    useEffect(() => {
        if(taskTitle.length > 0){
            dispatch(clearTaskError({error_type:'title'}))
        }
    },[taskTitle])

    useEffect(() => {
        if(taskDescription.length > 0){
            dispatch(clearTaskError({error_type:'description'}))
        }
    },[taskDescription])

    useEffect(() => {
        if(status != -1){
            dispatch(clearTaskError({error_type:'status'}))
        }
    },[status])

    useEffect(() => {
        subTasks.forEach((subtask, i) => {
            if(subtask.name.length > 0){
                dispatch(clearTaskError({error_type:'items',index: i}))
            }
        })
    },[subTasks])

    useEffect(() => {
        return () => {
            return dispatch(clearAllTaskErrors());
        }
    },[])

    const columnData = useSelector(
        (state) => state.tasks.tasks.filter(task => task.board_id === activeBoard.id).reduce(function(map, obj) {
            if(typeof map[obj.column_id] === 'undefined' ){
                map[obj.column_id] = []
            }
            map[obj.column_id].push(obj);
            return map;
        }, {})
    )
 
    const statusOptions = activeBoard.columns.map((column) => {
        return {
            name: column.name.charAt(0).toUpperCase() + column.name.slice(1),
            value: column.id
        }
    })

    const addItem = () => {
        let newSubTasks = [...subTasks]
        newSubTasks.push({name:"",complete:false})
        setSubTasks(newSubTasks)
    }

    const editSubtask = (index,titleText) => {
        let newSubtasks = [...subTasks]
        let newSubTask = {...newSubtasks[index]}
        newSubTask.name = titleText
        newSubtasks[index] = newSubTask
        setSubTasks(newSubtasks)
    }

    const deleteSubtask = (index) => {
        var doDelete = window.confirm("Do you wish to delete this subtask?  This data will be removed if you choose to save these changes");

        if(!doDelete){
            return false
        }
        let newSubTasks = [...subTasks]
        delete newSubTasks.splice(index,1)
        setSubTasks(newSubTasks)
    }


    const taskHandler = (e) => {

        let sortOrder = 0;

        let maxSortOrder = 0;

        boardTasks.forEach((task) => {
            if(task.sortOrder > maxSortOrder){
                maxSortOrder = task.sort_order
            }
        })

        if(typeof columnData[status] !== 'undefined'){
            sortOrder = maxSortOrder + 1
        }

        let payload = {
            "board_id":activeBoard.id,
            "column_id":status,
            "description":taskDescription,
            "sort_order": sortOrder,
            "name" : taskTitle,
            "subtasks" : subTasks
        }


        if(taskId !== -1){
            payload.id = taskId    
            dispatch(editTaskAction(payload))
        } else {
            dispatch(createTaskAction(payload))
         }

        
    }

    return (
        <AddTask 
            taskTitle={taskTitle}
            setTaskTitle={setTaskTitle}
            taskDescription={taskDescription}
            setTaskDescription={setTaskDescription}
            subTasks={subTasks}
            setSubTasks={setSubTasks}
            status={status}
            setStatus={setStatus}
            statusOptions={statusOptions}
            addItem={addItem}
            editSubtask={editSubtask}
            deleteSubtask={deleteSubtask}
            taskHandler={taskHandler}
            title={title}
            saveTaskButtonText={saveTaskButtonText}
            errors={errors}
            theme={theme.value}
        />
    )
}

export default AddTaskContainer