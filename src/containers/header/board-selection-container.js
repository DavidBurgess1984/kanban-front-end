import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveBoard } from "../../app/features/board/boardSlice";
import BoardSelection from "../../components/header/board-selection";

const BoardSelectionContainer = (props) => {

    const boards = useSelector((state) => state.board);
    const dispatch = useDispatch()

    const toggleActiveBoard = (e,activeBoardId) => {
        e.preventDefault();
        dispatch(setActiveBoard({activeBoard:activeBoardId}))
        props.toggleNavigationPanel(e)

    }
    return <BoardSelection 
        navigationVisible={props.navigationVisible}
        toggleNavigationPanel={props.toggleNavigationPanel}
        toggleAddBoardLightboxVisible={props.toggleAddBoardLightboxVisible}
        boards={boards.boards}
        activeBoard={boards.activeBoard}
        toggleActiveBoard={toggleActiveBoard}
    />
}

export default BoardSelectionContainer