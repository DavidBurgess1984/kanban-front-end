import React, { useEffect } from "react";

import { useBoards } from "../../app/providers/board-provider";
import Board from "../../components/board/board";
import { useTasks } from "../../app/providers/task-provider";
import { useLightbox } from "../../app/providers/lightbox-provider";
import { useMenu } from "../../app/providers/menu-provider";
import { useNavigate,  useParams } from "react-router";

const BoardContainer = () => {

    const {boards,activeBoard,boardExists,setActiveBoard,boardsLoading} = useBoards();
    const {tasks} = useTasks()
    const { toggleMenuVisible,visible } = useMenu();
    const { setLightboxContent, toggleLightboxVisible }  = useLightbox()
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        if(!boardsLoading){
            if(boardExists(params.boardId)){
                //set active board if param set
                setActiveBoard(params.boardId);
            } else if(typeof params.boardId === 'undefined'){
                if(typeof boards[0] !== 'undefined'){
                    //navigate to first board if not set in url
                    navigate('/kanban-front-end/'+boards[0].id)
                }
            }  else {
                navigate('/error')
            }
        }
        
    },[params.boardId,boards,boardsLoading])

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
            toggleMenuVisible(!visible)
        }
    }

    return (
        <Board 
            visible={visible}
            board={activeBoardData} 
            columnData={columnData} 
            showBoardEditModal={showBoardEditModal}
            toggleNavigationPanel={toggleNavigationPanel}
        />
    )
}

export default BoardContainer