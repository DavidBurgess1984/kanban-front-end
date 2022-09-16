import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Board from "../../components/board/board";

const BoardContainer = () => {

    const board = useSelector((state) => state.board)
    
    let activeBoard

    board.boards.forEach((boardData) => {
        if(boardData.id == board.activeBoard){
            activeBoard = {...boardData}
        }
    })



    const [taskIdDisplaying, viewTask] = useState(-1);
    const [taskMode, setTaskMode] = useState('view');
    

    // let columns = [...activeBoard.columns]
    const columnData = useSelector(
        (state) => state.tasks.tasks.filter(task =>typeof activeBoard !== 'undefined' && task.board_id === activeBoard.id).reduce(function(map, obj) {
            if(typeof map[obj.column_id] === 'undefined' ){
                map[obj.column_id] = []
            }
            map[obj.column_id].push(obj);
            return map;
        }, {})
    )

    // if(!board){
    //     return null
    // }


    const closeLightBox = (e) => {

        

        if(e.target === e.currentTarget) {
            e.preventDefault();
            setTaskMode('view')
            viewTask(-1)
        }
        

        
    
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