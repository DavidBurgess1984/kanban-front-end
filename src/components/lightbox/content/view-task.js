import React, { Fragment } from "react";
import Description from "../../common/description";
import Select from "../../common/select";
import ItemListView from "../../common/item-list-view";

const ViewTask = (props) => {

    const titleTheme = props.theme === 'dark' ? 'lightbox__title--dark' : '';
    let taskViewDropdown = null;

    if(props.taskDropdownOpen){
        taskViewDropdown = (
        <div className="task__toggle-dropdown" ref={props.wrapperRef}>
            <ul className='task__toggle-dropdown-list'>
                <li className="task__toggle-dropdown-list-item " onClick={(e) => props.setTaskEditMode()}>Edit Task</li>
                <li className="task__toggle-dropdown-list-item task__toggle-dropdown-list-item--red " onClick={(e) => props.setTaskDeleteMode()}>Delete Task</li>
            </ul>
        </div>
        )
    }


    return (
        <Fragment>
            {taskViewDropdown}
            <div className="lightbox__header">
                <h2 className={"lightbox__title "+titleTheme}>{props.task.name}</h2>
                <a className="lightbox__elipses" onClick={(e) => props.setTaskDropdownOpen(!props.taskDropdownOpen)}></a>
            </div>
            <div className="lightbox__content">
                <Description text={props.task.description}/>
                {typeof props.task.subtasks !== "undefined" && props.task.subtasks.length > 0 && <ItemListView items={props.task.subtasks} toggleItemStatus={props.toggleSubtaskStatus}/>}
                <Select title="Status" options={props.statusOptions} selected={props.task.column_id} handleChange={props.toggleTaskStatus} />
            </div>
      </Fragment>
    )
}

export default ViewTask