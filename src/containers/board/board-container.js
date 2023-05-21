import React from "react";

import { useBoards } from "../../app/providers/board-provider";
import Board from "../../components/board/board";
import { useTasks } from "../../app/providers/task-provider";
import { useLightbox } from "../../app/providers/lightbox-provider";
import { useNavigation } from "../../app/providers/navigation-provider";
import { useTheme } from "../../app/providers/theme-provider";

const BoardContainer = () => {

    const {boards,activeBoard} = useBoards();
    const {tasks} = useTasks()
    const { toggleNavigationVisible,visible } = useNavigation();
    const { setLightboxContent, toggleLightboxVisible }  = useLightbox()
    const {theme} = useTheme();

    let activeBoardData

    boards.forEach((boardData) => {
        if(boardData.id === activeBoard){
            activeBoardData = {...boardData}
        }
    })

    let columnData = [];
    // let columns = [...activeBoard.columns]
    columnData = tasks.filter(task =>typeof activeBoard !== 'undefined' && task.board_id ===activeBoard).reduce(function(map, obj) {
            if(typeof map[obj.column_id] === 'undefined' ){
                map[obj.column_id] = []
            }
            map[obj.column_id].push(obj);
            return map;;
        }, {})


    for(let col in columnData){
        columnData[col].sort((a,b) => a.sort_order - b.sort_order)
    }


    const showBoardEditModal = (e) => {
        setLightboxContent('edit-board');
        toggleLightboxVisible(true);
    }

    const toggleNavigationPanel = (e) => {
    
        e.preventDefault();
        e.stopPropagation();

        //lightbox grey bg click
        if (e.target === e.currentTarget) {
            toggleNavigationVisible(!visible)
        }
    }

    return (
        <Board 
            visible={visible}
            board={activeBoardData} 
            columnData={columnData} 
            showBoardEditModal={showBoardEditModal}
            toggleNavigationPanel={toggleNavigationPanel}
            theme={theme}
        />
    )
}

export default BoardContainer