import { createSlice } from '@reduxjs/toolkit'

export const defaultBoardColumns = [
    {
        "name": "todo",
        "id" : 1,
        "tasks":[]
    },
    {
        "name" : "doing",
        "id" : 2,
        "tasks":[]
    },
    {
        "name" : "done",
        "id" :3,
        "tasks":[]
    }
]

export const boardSlice = createSlice({
    name:'boards',
    initialState:{
        boards:[
            { 
                "id":1,
                "title":"Platform Launch",
                "columns": defaultBoardColumns
            },
            { 
                "id":1,
                "title":"Marketing Launch",
                "columns": defaultBoardColumns
            }
        ],
        activeBoard:0
    },
    reducers:{
        createBoard: (state,action) => {
            let board = {};
            board.id = makeid(10);
            board.title = action.payload.title;
            board.columns = defaultBoardColumns
            state.boards.push(board)
        },
        editBoardName: (state,action) => {
            state.boards.forEach((board,i) => {
                if(board.id === action.payload.board_id){
                    state.boards[i].name = action.payload.name
                }
            })
        },
        deleteBoard: (state,action) => {
            state.boards.forEach((board,i) => {
                if(board.id === action.payload.board_id){
                    delete state.boards[i]
                }
            })
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
    deleteBoardColumn
} = boardSlice.actions

export default boardSlice.reducer