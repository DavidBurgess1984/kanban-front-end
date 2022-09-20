import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { clearAllBoardErrors, clearBoardError, createBoard, editBoard } from "../../../app/features/board/boardSlice";
import AddBoard from "../../../components/lightbox/content/add-board";

const AddBoardContainer = (props) => {

    const dispatch = useDispatch()

    const [boardId,setBoardId] = useState(-1)
    const [title,setTitle] = useState("Add New Board")
    const [saveBoardButtonText,setSaveBoardButtonText] = useState("Create Board")
    const [boardTitle, setBoardTitle] = useState("")
    const [columns, setColumns] = useState([{name:""},{name:""}])
    // const [status,setStatus] = useState(1)
    
    const errors = useSelector((state) => state.board.errors);

    useEffect(() => {

        if(typeof props.activeBoard !== 'undefined'){
            setBoardTitle(props.activeBoard.title)
            setColumns(props.activeBoard.columns)
            setTitle("Edit Board")
            setSaveBoardButtonText("Save Changes")
            setBoardId(props.activeBoard.id)
        }
        
    },[props.activeBoard])

    useEffect(() => {
        if(boardTitle.length > 0){
            dispatch(clearBoardError({error_type:'title'}))
        }
    },[boardTitle])

    useEffect(() => {
        columns.forEach((column, i) => {
            if(column.name.length > 0){
                dispatch(clearBoardError({error_type:'items',index: i}))
            }
        })
    },[columns])

    useEffect(() => {
        return () => {
            dispatch(clearAllBoardErrors());
        }
    },[])



    const addColumn = () => {
        let newColumns = [...columns]
        newColumns.push({name:""})
        setColumns(newColumns)
    }

    const editColumn = (index,titleText) => {
        let newColumns = [...columns]
        let newCol = {...newColumns[index]}
        newCol.name = titleText
        newColumns[index] = newCol
        setColumns(newColumns)
    }

    const deleteColumn = (index) => {
        var doDelete = window.confirm("Do you wish to delete this column?  All task data will be lost if you save these changes");

        if(!doDelete){
            return false
        }
        let newColumns = [...columns]
        delete newColumns.splice(index,1)
        setColumns(newColumns)
    }


    const boardHandler = (e) => {

        let payload = {
            // "description":taskDescription,
            "title":boardTitle,
            "columns" : columns
        }

        if(boardId !== -1){
            payload.id = boardId
            dispatch(editBoard(payload))
        } else {
            dispatch(createBoard(payload))
         }

        
    }

    return (
        <AddBoard
            boardTitle={boardTitle}
            setBoardTitle={setBoardTitle}
            columns={columns}
            setColumns={setColumns}
            addColumn={addColumn}
            editColumn={editColumn}
            deleteColumn={deleteColumn}
            boardHandler={boardHandler}
            title={title}
            saveBoardButtonText={saveBoardButtonText}
            errors={errors}
        />
    )
}

export default AddBoardContainer