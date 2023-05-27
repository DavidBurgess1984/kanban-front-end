import React from "react";
import AddBoardContainer from "../../containers/lightbox/content/add-board-container";
import AddTaskContainer from "../../containers/lightbox/content/add-task-container";
import DeleteBoardContainer from "../../containers/lightbox/content/delete-board-container";
import DeleteTaskContainer from "../../containers/lightbox/content/delete-task-container";
import ViewTaskContainer from "../../containers/lightbox/content/view-task-container";

const Lightbox = (props) => {

    let lightboxContent = null;
  
    switch(props.lightbox){
      case 'add-task':
        lightboxContent = <AddTaskContainer />
        break;
      case 'add-board':
        lightboxContent = <AddBoardContainer />
        break;
      case 'edit-board':
        lightboxContent = <AddBoardContainer activeBoard={props.activeBoard} />
        break;
      case 'delete-board':
        lightboxContent = <DeleteBoardContainer activeBoard={props.activeBoard} />
        break;
        case 'view-task':
            lightboxContent = <ViewTaskContainer />
        break;
        case 'edit-task':
            lightboxContent = <AddTaskContainer  />
        break;
        case 'delete-task':
            lightboxContent = <DeleteTaskContainer  />
        break;
    }


    return (
        <div className="lightbox" >
            <div className="lightbox__container" ref={props.wrapperRef}>
                {lightboxContent}
            </div>
        </div>
    )
}

export default Lightbox