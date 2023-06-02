import React from "react";
import ThemeToggleContainer from "../../containers/header/theme-toggle-container";
import { Link } from "react-router-dom";

const BoardSelection = (props) => {


    return (
        <div className={"board-selection__container "+ (props.navigationVisible ? "board-selection__container--active" : "")} onClick={(e) => {props.toggleNavigationPanel(e)} }>
          <div className="board-selection__panel ">
            <h2 className="board-selection__title">All boards ({props.boards.length})</h2>
            <ul className="board-selection__panel-list ">
              {typeof props.boards !== "undefined" && props.boards.length > 0 && props.boards.map((board,i) => {
                return (
                  <li key={"board-select-"+i} ><Link to={"/kanban-front-end/"+board.id }  className={board.id === props.activeBoard ? "board-selection__panel-item board-selection__panel-item--active" : "board-selection__panel-item"}>{board.title}</Link></li>
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