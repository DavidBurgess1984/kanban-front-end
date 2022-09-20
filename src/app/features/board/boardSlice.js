import { createSlice } from '@reduxjs/toolkit'
import { activeBoardStorage, boardStorage } from '../../storage/localStorage';


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
        "id":"1",
        "title":"Platform Launch",
        "columns": defaultBoardColumns
    },
    { 
        "id":"2",
        "title":"Marketing Plan",
        "columns": defaultBoardColumns
    }
];

export const boardSlice = createSlice({
    name:'boards',
    initialState:{
        boards:[],
        activeBoard:-1,
        errors:{}
    },
    reducers:{
        setActiveBoard:(state,action) => {
            activeBoardStorage.set(action.payload.activeBoard)
            state.activeBoard = action.payload.activeBoard
        },
        createBoard: (state,action) => {

            let board = {};
            let errorsFound = false

            if(action.payload.title.length === 0){
                state.errors.title = "Can't be empty"
                errorsFound = true
            }

            board.id = makeid(10);
            board.title = action.payload.title;

            let columnErrors = {}
            action.payload.columns.forEach((column,i) => {
                if(column.name.length === 0){
                    errorsFound = true
                    columnErrors[i] = "Can't be Empty"
                }
                action.payload.columns[i].id = makeid(20)
            })

            if(errorsFound){
                state.errors.items = columnErrors
                return
            }

            if(!errorsFound){
                board.columns = action.payload.columns
                boardStorage.create(board)
                state.boards.push(board)
            }

            boardSlice.caseReducers.setActiveBoard(state, {payload:{activeBoard:board.id }});
            
        },
        editBoard:(state,action) => {

           
            state.boards.forEach((board,i) => {
                if(board.id === action.payload.id){

                    let errorsFound = false
                    if(action.payload.title.length === 0){
                        state.errors.title = "Can't be empty"
                        errorsFound = true
                    }

                    let columnErrors = {}
                    let columns = []
                    action.payload.columns.forEach((column,i) => {
                        let col = {...column}
                        if(col.name.length === 0){
                            errorsFound = true
                            columnErrors[i] = "Can't be Empty"
                        }

                        if(typeof col.id === 'undefined'){
                            col.id = makeid(20)
                        }
                        
                        columns.push(col)
                    })

                    action.payload.columns= columns

                    if(errorsFound){
                        state.errors.items = columnErrors
                    } else {                        
                        state.boards[i] = action.payload
                    }
                    
                    
                }
            })

            boardStorage.init([...state.boards]) 
        },
        deleteBoard: (state,action) => {
            state.boards.forEach((board,i) => {
                if(board.id === action.payload.id){
                    boardStorage.delete(board.id)
                    state.boards.splice(i,1)
                }
            })

            let activeBoard = -1;
            if(typeof state.boards[0].id !== 'undefined'){
                activeBoard = state.boards[0].id 
            }
            boardSlice.caseReducers.setActiveBoard(state, {payload:{activeBoard:activeBoard }});

        },
        addBoardColumn:(state,action) => {
            state.boards.forEach((board,i) => {
                if(board.id === action.payload.board_id){
                    state.boards[i].columns.push({
                        name:action.payload.name
                    })
                }
            })
        },
        editBoardColumnName:(state,action) => {
            state.boards.forEach((board,i) => {
                if(board.id === action.payload.board_id){
                    state.boards[i].columns.forEach((column, j) => {
                        if(column.id === action.payload.column_id){
                            state.boards[i].columns[j].name = action.payload.name
                        }
                    })
                }
            })
        },
        deleteBoardColumn:(state,action) => {
            state.boards.forEach((board,i) => {
                if(board.id === action.payload.board_id){
                    state.boards[i].columns.forEach((column, j) => {
                        if(column.id === action.payload.column_id){
                            delete state.boards[i].columns[j]
                        }
                    })
                }
            })
        },
        initialiseBoards:(state, _)=>{
            // boardStorage.clear()
            let boardsInStorage = boardStorage.getAll()
            let boards = []

            if(!boardsInStorage){
                boardStorage.init(defaultBoardState);
                boards = defaultBoardState
                state.activeBoard = boards[0].id;
            } else {
                boards = boardsInStorage
                state.activeBoard = boards[0].id;
            }

            
            state.boards = boards
        },
        clearBoardError(state,action){
            if(typeof action.payload.index !== 'undefined'  && action.payload.error_type === 'items'){
                
                if(typeof state.errors.items !== 'undefined'){
                  
                    delete state.errors.items[action.payload.index]
                }
                
            } else {
                delete state.errors[action.payload.error_type]
            }
            
        },
        clearAllBoardErrors(state){
            state.errors = {}
        },
    }
})

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * 
        charactersLength));
    }
    return result;
}

export const {
    createBoard,
    editBoardName,
    deleteBoard,
    addBoardColumn,
    editBoardColumnName,
    deleteBoardColumn,
    editBoard,
    initialiseBoards,
    setActiveBoard,
    clearBoardError,
    clearAllBoardErrors
} = boardSlice.actions

export default boardSlice.reducer