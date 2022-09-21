import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveBoard } from "../../app/features/board/boardSlice";
import { toggleNavigationVisible } from "../../app/features/navigation/navigationSlice";
import BoardSelection from "../../components/header/board-selection";

const BoardSelectionContainer = (props) => {

    const boards = useSelector((state) => state.board);
    const navigation = useSelector(state => state.navigation)
    const theme = useSelector((state) => state.theme)

    const dispatch = useDispatch()

    const toggleActiveBoard = (e,activeBoardId) => {
        e.preventDefault();
        dispatch(setActiveBoard({activeBoard:activeBoardId}))
        props.toggleNavigationPanel(e)

    }

    const closeNavigationPanel = (e) => {
        dispatch(toggleNavigationVisible({isVisible:!navigation.isVisible}))

    }
    return <BoardSelection 
        navigationVisible={props.navigationVisible}
        toggleNavigationPanel={props.toggleNavigationPanel}
        showAddBoardLightbox={props.showAddBoardLightbox}
        boards={boards.boards}
        activeBoard={boards.activeBoard}
        toggleActiveBoard={toggleActiveBoard}
        closeNavigationPanel={closeNavigationPanel}
        theme={theme.value}
    />
}

export default BoardSelectionContainer