import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { clearAllTaskErrors, clearTaskError, createTask, editTask } from "../../../app/features/task/taskSlice";
import AddBoard from "../../../components/lightbox/content/add-board";
import AddTask from "../../../components/lightbox/content/add-task";

const AddBoardContainer = (props) => {

    const dispatch = useDispatch()

    const [taskId,setTaskId] = useState(-1)
    const [title,setTitle] = useState("Add New Board")
    const [saveBoardButtonText,setSaveBoardButtonText] = useState("Create Board")
    const [boardTitle, setBoardTitle] = useState("")
    const [taskDescription, setTaskDescription] = useState("")
    const [subTasks, setSubTasks] = useState([{name:"",complete:false},{name:"",complete:false}])
    const [status,setStatus] = useState(1)
    
    const activeBoardIndex = useSelector((state) => state.board.activeBoard);

    const board = useSelector((state) => state.board)
    let activeBoard = {...board.boards[activeBoardIndex]};

    const task = useSelector(
        (state) => state.tasks.tasks.filter(task => task.id === props.taskIdDisplaying)
    )[0]

    const errors = useSelector((state) => state.tasks.errors)

    useEffect(() => {
        if(typeof task !== 'undefined'){
            setBoardTitle(task.name)
            setTaskDescription(task.description)
            setSubTasks(task.subtasks)
            setStatus(task.column_id)
            setTitle("Edit Board")
            setSaveBoardButtonText("Save Changes")
            setTaskId(task.id)
        }
        
    },[task])

    useEffect(() => {
        if(boardTitle.length > 0){
            dispatch(clearTaskError({error_type:'title'}))
        }
    },[boardTitle])

    useEffect(() => {
        if(taskDescription.length > 0){
            dispatch(clearTaskError({error_type:'description'}))
        }
    },[taskDescription])

    useEffect(() => {
        subTasks.forEach((subtask, i) => {
            if(subtask.name.length > 0){
                dispatch(clearTaskError({error_type:'subtask',index: i}))
            }
        })
    },[subTasks])

    useEffect(() => {
        return () => {
            dispatch(clearAllTaskErrors());
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
            "name" : boardTitle,
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
        <AddBoard
            boardTitle={boardTitle}
            setBoardTitle={setBoardTitle}
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
            saveBoardButtonText={saveBoardButtonText}
            errors={errors}
        />
    )
}

export default AddBoardContainer