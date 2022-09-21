import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLightboxContent, toggleLightboxVisible } from "../../app/features/lightbox/lightboxSlice";
import { toggleNavigationVisible } from "../../app/features/navigation/navigationSlice";
import Board from "../../components/board/board";

const BoardContainer = () => {

    const board = useSelector((state) => state.board)
    const theme = useSelector((state) => state.theme)
    const dispatch = useDispatch()
    let activeBoard

    board.boards.forEach((boardData) => {
        if(boardData.id === board.activeBoard){
            activeBoard = {...boardData}
        }
    })

    const navigation = useSelector(state => state.navigation)


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

    for(let col in columnData){
        columnData[col].sort((a,b) => a.sort_order - b.sort_order)
    }

    const showBoardEditModal = (e) => {
        dispatch(setLightboxContent({content:'edit-board'}));
        dispatch(toggleLightboxVisible({isVisible:true}));
    }

    const toggleNavigationPanel = (e) => {
    
        e.preventDefault();
        e.stopPropagation();
        // alert('here')
        //lightbox grey bg click
        if (e.target === e.currentTarget) {
            dispatch(toggleNavigationVisible({isVisible:!navigation.isVisible}))
        }
    }

    return (
        <Board 
            navigation={navigation}
            board={activeBoard} 
            columnData={columnData} 
            showBoardEditModal={showBoardEditModal}
            toggleNavigationPanel={toggleNavigationPanel}
            theme={theme.value}
        />
    )
}

export default BoardContainer