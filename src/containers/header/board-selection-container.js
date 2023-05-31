import React from "react";
import { useBoards } from "../../app/providers/board-provider";
import BoardSelection from "../../components/header/board-selection";
import { useMenu } from "../../app/providers/menu-provider";
import { useTheme } from "../../app/providers/theme-provider";

const BoardSelectionContainer = (props) => {

    const {toggleMenuVisible,visible} =  useMenu()
    const {boards,setActiveBoard,activeBoard} = useBoards();
    // const navigation = useSelector(state => state.navigation)
    const {theme} = useTheme();

    const toggleActiveBoard = (e,activeBoardId) => {
        e.preventDefault();
        setActiveBoard(activeBoardId)
        props.toggleNavigationPanel(e)

    }

    const closeNavigationPanel = (e) => {
        toggleMenuVisible(!visible)

    }
    return <BoardSelection 
        navigationVisible={visible}
        toggleNavigationPanel={props.toggleNavigationPanel}
        showAddBoardLightbox={props.showAddBoardLightbox}
        boards={boards}
        activeBoard={activeBoard}
        toggleActiveBoard={toggleActiveBoard}
        closeNavigationPanel={closeNavigationPanel}
        theme={theme}
    />
}

export default BoardSelectionContainer