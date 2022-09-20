import React, { Fragment } from "react";
import ColumnContainer from "../../containers/board/column-container";
import ColumnHeaderContainer from "../../containers/board/column-header-container";
import TaskContainer from "../../containers/board/task-item-container";

const Board = (props) => {

  let boardContent = (
    <div className="kanban-board__new-panel">
      <p className="kanban-board__text">This board is empty. Create a new column to get started.</p>
      <button className="kanban-board__button kanban-board__button--main" onClick={(e) => props.showBoardEditModal()}>
        + Add New Column
      </button>
    </div>
  );

   if (typeof props.board !== 'undefined' && props.board.columns.length > 0){
      boardContent =  (
        props.board.columns.map( (column,i) => {
                
        let taskCount = typeof props.columnData[column.id] !== 'undefined' && props.columnData[column.id].length > 0 ? props.columnData[column.id].length : 0;
          return (
            <ColumnContainer key={"col-"+column.id} column={column} taskCount={taskCount} columnData={props.columnData} otherTasks={props.columnData[column.id]}/>
          )
      }))
      boardContent.push(<div className="kanban__column kanban__column--create" onClick={(e) => props.showBoardEditModal()}>
          <a href='#' className="kanban__add" >+ New Column</a>
      </div>)
  }

  let kanbanClass = "kanban-board kanban-board--active kanban-board--center"

  if(typeof props.board !== 'undefined'  && props.board.columns.length >  0){
    kanbanClass = "  kanban-board kanban-board--active"
  }

  if(typeof props.navigation !== 'undefined'  && props.navigation.isVisible){
    kanbanClass += " kanban-board--navigation-active"
  }

    return (
      <Fragment>
        <div className={kanbanClass} >
          {boardContent}
          <a className='board__show-navigation-btn' href='/' onClick={(e) => props.toggleNavigationPanel(e)}></a>
        </div>
      </Fragment>

    )
}

export default Board