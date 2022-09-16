import React, { Fragment } from "react";
import ColumnHeaderContainer from "../../containers/board/column-header-container";
import TaskContainer from "../../containers/board/task-item-container";
import AddTaskContainer from "../../containers/lightbox/content/add-task-container";
import DeleteTaskContainer from "../../containers/lightbox/content/delete-task-container";
import ViewTaskContainer from "../../containers/lightbox/content/view-task-container";
import LightboxContainer from "../../containers/lightbox/lightbox-container";

const Board = (props) => {

  let lightbox = null;

  if(props.taskIdDisplaying != -1){

  let lightboxView = null;

    switch(props.taskMode){
      case 'view':
        lightboxView = <ViewTaskContainer taskIdDisplaying={props.taskIdDisplaying} taskMode={props.taskMode} setTaskMode={props.setTaskMode}/>
        break;
      case 'edit':
        lightboxView = <AddTaskContainer taskIdDisplaying={props.taskIdDisplaying} />
        break;
      case 'delete':
        lightboxView = <DeleteTaskContainer taskIdDisplaying={props.taskIdDisplaying} closeLightBox={(e) => props.closeLightBox(e)} />
        break;
    }
    lightbox = (
      <LightboxContainer closeLightBox={(e) => props.closeLightBox(e)} >
        {lightboxView}
      </LightboxContainer>
    )
  }

  let boardContent = (
    <div className="kanban-board__new-panel">
      <p className="kanban-board__text">This board is empty. Create a new column to get started.</p>
      <button className="kanban-board__button kanban-board__button--main">
        + Add New Column
      </button>
    </div>
  );

  console.log(props.board)

   if (typeof props.board !== 'undefined' && props.board !== {}){
      boardContent =  (
        props.board.columns.map( (column,i) => {
                
        let taskCount = typeof props.columnData[column.id] !== 'undefined' && props.columnData[column.id].length > 0 ? props.columnData[column.id].length : 0;
          return (
              <div className="kanban__column">
                  <ColumnHeaderContainer title={column.name} taskCount={taskCount} type={column.name}/>
                  { typeof props.columnData[column.id] !== 'undefined' && props.columnData[column.id].map((task) => {
                      return (
                          <TaskContainer task={task} viewTask={props.viewTask} closeLightBox={props.closeLightBox}/>
                      )
                  })

                  }
              </div>
          )
      }))
  }

    return (
      <Fragment>
        {lightbox}
    <div className="kanban-board kanban-board--active">
        {boardContent}
       
        </div>
        </Fragment>

    )
}

export default Board