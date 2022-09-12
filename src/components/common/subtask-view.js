import React, { Fragment } from "react"

import SubtaskViewItem from "./subtask-view-item";

const SubtaskView = ({subtasks,toggleSubtaskStatus,editSubtaskHandler,deleteSubtaskHandler}) => {

    let subtaskList = [];

    subtasks.map((subtask,i) => {

        subtaskList.push(<SubtaskViewItem key={"subtask-item-"+i} checked={subtask.complete} name={subtask.name} index={i} toggleSubtaskStatus={toggleSubtaskStatus} id={subtask.id}/>)
    });

    return (
        <Fragment>
            <h3 class="subtask__title">{"Subtasks (2 of "+subtasks.length+")"}</h3>
            <ul class="subtasks">
                {subtaskList}
            </ul>
        </Fragment>
    )
}

export default SubtaskView