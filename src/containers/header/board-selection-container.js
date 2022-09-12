import React from "react";
import BoardSelection from "../../components/header/board-selection";

const BoardSelectionContainer = (props) => {
    return <BoardSelection 
        navigationVisible={props.navigationVisible}
        toggleNavigationPanel={props.toggleNavigationPanel}
    />
}

export default BoardSelectionContainer