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
                <li class="task__toggle-dropdown-list-item task__toggle-dropdown-list-item--red">Delete Task</li>
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
                {/* <h3 class="subtask__title">Subtasks (2 of 3)</h3>
                <ul class="subtasks">
                <li class="subtask__item">
                    <input type="checkbox" class="subtask__checkbox"  id="subtask__checkbox--1"/>
                    <label for="subtask__checkbox--1" class="subtask__label">Research competitor pricing and business models</label>
                </li>
                <li class="subtask__item">
                    <input type="checkbox" class="subtask__checkbox"  id="subtask__checkbox--2"/>
                    <label for="subtask__checkbox--2" class="subtask__label">Outline a business model that works for our solution</label>
                </li>
                <li class="subtask__item">
                    <input type="checkbox" class="subtask__checkbox"  id="subtask__checkbox--3"/>
                    <label for="subtask__checkbox--3" class="subtask__label">Surveying and testing</label>
                </li>
                </ul> */}
                <SubtaskView subtasks={props.task.subtasks} toggleSubtaskStatus={props.toggleSubtaskStatus}/>
                <Select title="Status" options={props.statusOptions} selected={props.status} handleChange={props.toggleTaskStatus} />
                {/* <div class="subtask__status">
                <p class="status__title">Current Status</p>
                <div class="status__wrapper">
                    <select class="status__select">
                    <option class="status__option">Doing</option>
                    <option class="status__option">Done</option>
                    <option class="status__option">Todo</option>
                    </select>
                </div>
                </div> */}
            </div>
      </Fragment>
    )
}

export default ViewTask