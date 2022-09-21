import React from "react";
import ThemeToggleContainer from "../../containers/header/theme-toggle-container";

const BoardSelection = (props) => {

  const themeClass = props.theme === 'dark' ? "board-selection__panel--dark" : "";

    return (
        <div className={"board-selection__container "+ (props.navigationVisible ? "board-selection__container--active" : "")} onClick={(e) => {props.toggleNavigationPanel(e)} }>
          <div className={"board-selection__panel "+themeClass}>
            <h2 className="board-selection__title">All boards (3)</h2>
            <ul className="board-selection__panel-list ">
              {typeof props.boards !== "undefined" && props.boards.length > 0 && props.boards.map((board,i) => {
                return (
                  <li key={"board-select-"+i}className={board.id == props.activeBoard ? "board-selection__panel-item board-selection__panel-item--active" : "board-selection__panel-item"} onClick={(e) => props.toggleActiveBoard(e, board.id)}>{board.title}</li>
                )
              })}
              
              <li className="board-selection__panel-item  board-selection__panel-item--create" onClick={(e) => props.showAddBoardLightbox(e)}>+ Create New Board</li>
            </ul>
            <ThemeToggleContainer />
            <a className="board-selection__hide-sidebar" onClick={(e) => props.closeNavigationPanel(e)}>
              <p className="board-selection__hide-text" >Hide Sidebar</p>
            </a>
          </div>
        </div>
    )
}

export default BoardSelection