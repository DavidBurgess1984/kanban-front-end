import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Board from "../../components/board/board";

const BoardContainer = () => {

    const board = useSelector((state) => state.board)
    const activeBoardIndex = 0;

    let activeBoard = {...board.boards[activeBoardIndex]};

    const [taskIdDisplaying, viewTask] = useState(-1);
    const [taskMode, setTaskMode] = useState('view');
    

    // let columns = [...activeBoard.columns]
    const columnData = useSelector(
        (state) => state.tasks.tasks.filter(task => task.board_id === activeBoard.id).reduce(function(map, obj) {
            if(typeof map[obj.column_id] === 'undefined' ){
                map[obj.column_id] = []
            }
            map[obj.column_id].push(obj);
            return map;
        }, {})
    )

    

    // activeBoard.columns = columns
    // console.log(activeBoard)
    // // // console.log(task);
    // task.tasks.forEach(task => {
    //     if(task.board_id === activeBoard.id){
    //         activeBoard.columns.forEach( (column,i )=> {
               
    //             if(column.id === task.column_id){
    //                 let tasks = [...activeBoard.columns[i].tasks]
    //                 tasks.push(task)
    //                 activeBoard.columns[i].tasks = tasks;
    //             }
    //         })
    //     }
    // });

    // console.log(activeBoard)

    // const getTaskData = (taskIdDisplaying) => {
        
    // }

    const closeLightBox = (e) => {
        viewTask(-1)
    }

    return (
        <Board 
            board={activeBoard} 
            columnData={columnData} 
            taskIdDisplaying={taskIdDisplaying}
            viewTask={viewTask}
            closeLightBox={closeLightBox}
            taskMode={taskMode}
            setTaskMode={setTaskMode}
        />
    )
}

export default BoardContainer