import React, { Fragment } from "react";
import Description from "../../common/description";
import Select from "../../common/select";
import SubtaskView from "../../common/subtask-view";

const ViewTask = (props) => {

    let taskViewDropdown = null;

    if(props.taskDropdownOpen){
        taskViewDropdown = (
        <div class="task__toggle-dropdown">
            <ul class='task__toggle-dropdown-list'>
                <li class="task__toggle-dropdown-list-item" onClick={(e) => props.setTaskMode('edit')}>Edit Task</li>
                <li class="task__toggle-dropdown-list-item task__toggle-dropdown-list-item--red" onClick={(e) => props.setTaskMode('delete')}>Delete Task</li>
            </ul>
        </div>
        )
    }


    return (
        <Fragment>
            {taskViewDropdown}
            <div class="lightbox__header">
                <h2 class="lightbox__title">{props.task.name}</h2>
                <a class="lightbox__elipses" onClick={(e) => props.setTaskDropdownOpen(!props.taskDropdownOpen)}></a>
            </div>
            <div class="lightbox__content">
                <Description text={props.task.description}/>
                <SubtaskView subtasks={props.task.subtasks} toggleSubtaskStatus={props.toggleSubtaskStatus}/>
                <Select title="Status" options={props.statusOptions} selected={props.task.column_id} handleChange={props.toggleTaskStatus} />
            </div>
      </Fragment>
    )
}

export default ViewTask