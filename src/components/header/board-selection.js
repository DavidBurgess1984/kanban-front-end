import React from "react";
import ThemeToggleContainer from "../../containers/header/theme-toggle-container";

const BoardSelection = (props) => {
    return (
        <div className={"board-selection__container "+ (props.navigationVisible ? "board-selection__container--active" : "")} onClick={(e) => {props.toggleNavigationPanel(e)} }>
          <div className="board-selection__panel">
            <h2 className="board-selection__title">All boards (3)</h2>
            <ul className="board-selection__panel-list ">
              <li className="board-selection__panel-item board-selection__panel-item--active">Platform Launch</li>
              <li className="board-selection__panel-item ">Marketing Launch</li>
              <li className="board-selection__panel-item  board-selection__panel-item--create" onClick={(e) => props.toggleAddBoardLightboxVisible(e)}>+ Create New Board</li>
            </ul>
            <ThemeToggleContainer />
          </div>
        </div>
    )
}

export default BoardSelection