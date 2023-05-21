import React, { useEffect, useState } from "react";
import { useBoards } from "../../../app/providers/board-provider"
import AddBoard from "../../../components/lightbox/content/add-board";
import { useTheme } from "../../../app/providers/theme-provider";

const AddBoardContainer = (props) => {


    const [boardId,setBoardId] = useState(-1)
    const [title,setTitle] = useState("Add New Board")
    const [saveBoardButtonText,setSaveBoardButtonText] = useState("Create Board")
    const [boardTitle, setBoardTitle] = useState("")
    const [columns, setColumns] = useState([{name:""},{name:""}])
    const [isLoaded,setIsLoaded] = useState(false);
    const {theme} = useTheme()

    const {clearAllBoardErrors, clearBoardError, createBoard, editBoard,errors} = useBoards();
    
    // const errors = useSelector((state) => state.board.errors);

    useEffect(() => {

        // alert('hret')
        if(!isLoaded && typeof props.activeBoard !== 'undefined'){
            setBoardTitle(props.activeBoard.title)
            setColumns(props.activeBoard.columns)
            setTitle("Edit Board")
            setSaveBoardButtonText("Save Changes")
            setBoardId(props.activeBoard.id)
        }

        setIsLoaded(true)
        
    },[props.activeBoard,isLoaded])

    useEffect(() => {
        if(boardTitle.length > 0){
            clearBoardError({error_type:'title'})
        }
    },[boardTitle])

    useEffect(() => {
        columns.forEach((column, i) => {
            if(column.name.length > 0){
                clearBoardError({error_type:'items',index: i})
            }
        })
    },[columns])

    useEffect(() => {
        return () => {
            clearAllBoardErrors();
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
            payload.boardId = boardId
            editBoard(payload)
        } else {
            createBoard(payload)
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
            theme={theme}
        />
    )
}

export default AddBoardContainer