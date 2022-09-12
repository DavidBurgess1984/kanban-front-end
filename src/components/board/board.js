import React, { Fragment } from "react";
import ColumnHeaderContainer from "../../containers/board/column-header-container";
import TaskContainer from "../../containers/board/task-item-container";
import AddTaskContainer from "../../containers/lightbox/content/add-task-container";
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
    }
    lightbox = (
      <LightboxContainer /*closeLightBox={(e) => props.viewTask(-1)}*/ >
        {lightboxView}
      </LightboxContainer>
    )
  }

    return (
      <Fragment>
        {lightbox}
    <div class="kanban-board kanban-board--active">
        {/* <!-- <div class="kanban-board__new-panel">
          <p class="kanban-board__text">This board is empty. Create a new column to get started.</p>
          <button class="kanban-board__button kanban-board__button--main">
            + Add New Column
          </button>
        </div> --> */}
        {props.board.columns.map( (column,i) => {

            return (
                <div className="kanban__column">
                    <ColumnHeaderContainer title={column.name} taskCount={4} type={column.name}/>
                    { typeof props.columnData[column.id] !== 'undefined' && props.columnData[column.id].map((task) => {
                        return (
                            <TaskContainer task={task} viewTask={props.viewTask} closeLightBox={props.closeLightBox}/>
                        )
                    })

                    }
                </div>
            )
        })}
        </div>
        </Fragment>

    )
}

export default Board