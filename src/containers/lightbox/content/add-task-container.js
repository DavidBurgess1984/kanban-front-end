import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { createTask, editTask } from "../../../app/features/task/taskSlice";
import AddTask from "../../../components/lightbox/content/add-task";

const AddTaskContainer = (props) => {

    const dispatch = useDispatch()

    const [taskId,setTaskId] = useState(-1)
    const [title,setTitle] = useState("Add New Task")
    const [saveTaskButtonText,setSaveTaskButtonText] = useState("Create Task")
    const [taskTitle, setTaskTitle] = useState("")
    const [taskDescription, setTaskDescription] = useState("")
    const [subTasks, setSubTasks] = useState([{name:"",complete:false},{name:"",complete:false}])
    const [status,setStatus] = useState(1)
    
    const activeBoardIndex = useSelector((state) => state.board.activeBoard);

    const board = useSelector((state) => state.board)
    let activeBoard = {...board.boards[activeBoardIndex]};

    const task = useSelector(
        (state) => state.tasks.tasks.filter(task => task.id === props.taskIdDisplaying)
    )[0]



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

    const addSubtask = () => {
        let newSubTasks = [...subTasks]
        newSubTasks.push({name:"",complete:false})
        setSubTasks(newSubTasks)
    }

    const editSubtask = (index,titleText) => {
        let newSubTasks = [...subTasks]
        newSubTasks[index].name = titleText
        setSubTasks(newSubTasks)
    }

    const deleteSubtask = (index) => {
        var doDelete = window.confirm("Do you wish to delete this subtask?  This cannot be undone");

        if(!doDelete){
            return false
        }
        let newSubTasks = [...subTasks]
        delete newSubTasks.splice(index,1)
        setSubTasks(newSubTasks)
    }


    const taskHandler = (e) => {

        let sortOrder = 9999;

        if(typeof columnData[status] !== 'undefined'){
            sortOrder = columnData[status].length + 1
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
            dispatch(editTask(payload))
        } else {
            dispatch(createTask(payload))
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
            addSubtask={addSubtask}
            editSubtask={editSubtask}
            deleteSubtask={deleteSubtask}
            taskHandler={taskHandler}
            title={title}
            saveTaskButtonText={saveTaskButtonText}
        />
    )
}

export default AddTaskContainer