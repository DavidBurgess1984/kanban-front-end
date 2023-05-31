import React, { useContext, useState } from "react";
import { boardStorage } from "../storage/localStorage";
import { useLightbox } from "./lightbox-provider";

export const defaultBoardColumns = [
    {
        "name": "todo",
        "id" : "1",
        "tasks":[]
    },
    {
        "name" : "doing",
        "id" : "2",
        "tasks":[]
    },
    {
        "name" : "done",
        "id" :"3",
        "tasks":[]
    }
]

export const defaultBoardState = [
    { 
        "id":"1cfjh4sdsdXX",
        "title":"Platform Launch",
        "columns": defaultBoardColumns
    },
    { 
        "id":"2h546sd47kvddr",
        "title":"Marketing Plan",
        "columns": defaultBoardColumns
    }
];

const BoardsContext = React.createContext(null);

const BoardsProvider = ({ children }) => {
  const [boards,setBoards] = useState([]);
  const [activeBoard,setActiveBoard] = useState(-1);
  const [errors,setErrors] = useState({});
  const [boardsLoading,setBoardsLoading] = useState(true)

   const {toggleLightboxVisible} = useLightbox();

  const createBoard = (payload) => {
    let board = {};
    let newBoards = [...boards]
    let errorsFound = false
    let newErrors = {...errors}
    if(payload.title.length === 0){
        
        newErrors.title = "Can't be empty"
        errorsFound = true
    }

    board.id = makeid(10);
    board.title = payload.title;

    let columnErrors = {}
    payload.columns.forEach((column,i) => {
        if(column.name.length === 0){
            errorsFound = true
            columnErrors[i] = "Can't be Empty"
        }
        payload.columns[i].id = makeid(20)
    })

    if(errorsFound){
        newErrors.items = columnErrors
        setErrors(newErrors)
        return false
    }

    if(!errorsFound){
        board.columns = payload.columns
        boardStorage.create(board)
        newBoards.push(board)
        setBoards(newBoards)
    }

    // setActiveBoard(board.id);
    toggleLightboxVisible(false)   
    return board.id
         
  }

  const boardExists = (boardId) => {
    console.log(boards)
    return boards.some(board => board.id === boardId)
  }


  //Load route messages from the db
  const editBoard = (payload) => {

    const {boardId,title,columns} = payload

    let newErrors = {...errors}
    let newBoards = [];
    let errorsFound = false
    boards.forEach((board,i) => {
        if(board.id === boardId){

            let newBoard = {};
            
            if(title.length === 0){
                newErrors.title = "Can't be empty"
                errorsFound = true
            }

            let columnErrors = {}
            let newColumns = []
            
            columns.forEach((column,i) => {
                let col = {...column}
                if(col.name.length === 0){
                    errorsFound = true
                    columnErrors[i] = "Can't be Empty"
                }

                if(typeof col.id === 'undefined'){
                    col.id = makeid(20)
                }
                
                newColumns.push(col)
            })


            if(errorsFound){
                newErrors.items = columnErrors
            } else {            
                newBoard.id = boardId            
                newBoard.title = title;
                newBoard.columns = newColumns;
                newBoards[i] = newBoard

                boardStorage.update(boardId ,newBoard)
            }
            
            
        } else {
            newBoards[i] = board
        }

        
    })

    if(errorsFound){
        setErrors(newErrors);
    } else {
        setBoards(newBoards)
    }

    toggleLightboxVisible(false)

  }

    const deleteBoard = (boardId) => {

        let newBoards = [...boards]
        boards.forEach((board,i) => {
            if(board.id === boardId){
                boardStorage.delete(board.id)
                newBoards.splice(i,1)
            }
        })

        let activeBoard = -1;
        if(typeof boards[0].id !== 'undefined'){
            activeBoard = boards[0].id 
        }
        setActiveBoard(activeBoard );
        setBoards(newBoards)
        toggleLightboxVisible(false)
    }

    const addBoardColumn = (boardId,title) => {

        let newBoards = [];
        boards.forEach((board,i) => {
            let newBoard = board;
            if(board.id === boardId){
                newBoard['name'] = title
            }

            newBoards.push(newBoard)
        })

        setBoards(newBoards)
    }

    const editBoardColumnName = (boardId,columnId, name) => {

        let newBoards = [];

        boards.forEach((board,i) => {

            let newBoard = board;
            if(board.id === boardId){
                newBoard.columns.forEach((column, j) => {
                    if(column.id === columnId){
                        newBoard.columns[j].name = name
                    }
                })
            }

            newBoards.push(newBoard)
        })

        setBoards(newBoards)
    }

    const deleteBoardColumn = (boardId,columnId) => {

        let newBoards = [];

        boards.forEach((board,i) => {
            let newBoard = board;
            if(board.id === boardId){

                let newColumns = [];

                newBoard.columns.forEach((column, j) => {
                    if(column.id !==  columnId){
                        newColumns.push(column)
                    }
                })

                newBoards.columns = newColumns;


            }

            newBoards.push(newBoard)
        })

        setBoards(newBoards)
    }

    const initialiseBoards = () =>{
        // boardStorage.clear()
        // alert('here')
        let boardsInStorage = boardStorage.getAll()
        let boards = []

        if(!boardsInStorage){
            boardStorage.init(defaultBoardState);
            boards = defaultBoardState
            // setActiveBoard(boards[0].id);
        } else {
            boards = boardsInStorage
            // setActiveBoard(boards[0].id);
        }

        setBoards(boards)
        setBoardsLoading(false)
    }

    const clearBoardError = (payload) => {

        let newErrors = {...errors}
        if(typeof payload.index !== 'undefined'  && payload.error_type === 'items'){
            
            if(typeof newErrors.items !== 'undefined'){
              
                delete newErrors.items[payload.index]
            }
            
        } else {
            delete newErrors[payload.error_type]
        }

        setErrors(newErrors)
        
    }

    const clearAllBoardErrors = () => {
        setErrors({})
    }

    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * 
            charactersLength));
        }
        return result + Date.now();
    }

  

  // Render the children within the TaskContext's provider. The value contains
  // everything that should be made available to descendants that use the
  // useBoards hook.
  return (
    <BoardsContext.Provider
      value={{
        createBoard,
        deleteBoard,
        addBoardColumn,
        editBoardColumnName,
        deleteBoardColumn,
        editBoard,
        boards,
        activeBoard,
        initialiseBoards,
        setActiveBoard,
        boardExists,
        boardsLoading,
        clearBoardError,
        clearAllBoardErrors,
        errors
      }}
    >
      {children}
    </BoardsContext.Provider>
  );
};

// The useBoards hook can be used by any descendant of the BoardsProvider. It
// provides the Goals of the BoardsProvider's project and various functions to
// create, update, and delete the Goals in that project.
const useBoards = () => {
  const goals = useContext(BoardsContext);
  if (goals == null) {
    throw new Error("useBoards() called outside of a BoardsProvider?"); // an alert is not placed because this is an error for the developer not the user
  }
  return goals;
};

export { BoardsProvider, useBoards };
