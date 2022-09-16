import React, { Fragment } from "react";
import Description from "../../common/description";
import Select from "../../common/select";
import ItemListView from "../../common/item-list-view";

const ViewTask = (props) => {

    let taskViewDropdown = null;

    if(props.taskDropdownOpen){
        taskViewDropdown = (
        <div className="task__toggle-dropdown" ref={props.wrapperRef}>
            <ul className='task__toggle-dropdown-list'>
                <li className="task__toggle-dropdown-list-item" onClick={(e) => props.setTaskMode('edit')}>Edit Task</li>
                <li className="task__toggle-dropdown-list-item task__toggle-dropdown-list-item--red" onClick={(e) => props.setTaskMode('delete')}>Delete Task</li>
            </ul>
        </div>
        )
    }


    return (
        <Fragment>
            {taskViewDropdown}
            <div className="lightbox__header">
                <h2 className="lightbox__title">{props.task.name}</h2>
                <a className="lightbox__elipses" onClick={(e) => props.setTaskDropdownOpen(!props.taskDropdownOpen)}></a>
            </div>
            <div className="lightbox__content">
                <Description text={props.task.description}/>
                <ItemListView subtasks={props.task.subtasks} toggleSubtaskStatus={props.toggleSubtaskStatus}/>
                <Select title="Status" options={props.statusOptions} selected={props.task.column_id} handleChange={props.toggleTaskStatus} />
            </div>
      </Fragment>
    )
}

export default ViewTask