import React, { Fragment } from "react"
import { createSubTask } from "../../app/features/task/taskSlice";

import SubtaskViewItem from "./subtask-view-item";

const SubtaskView = ({subtasks,toggleSubtaskStatus}) => {

    let subtaskList = [];
    let subtaskCompletedCount = 0;

    subtasks.map((subtask,i) => {
        if(subtask.complete){
            subtaskCompletedCount++
        }
        subtaskList.push(<SubtaskViewItem key={"subtask-item-"+i} checked={subtask.complete} name={subtask.name} index={i} toggleSubtaskStatus={toggleSubtaskStatus} id={subtask.id}/>)
    });

    return (
        <Fragment>
            <h3 class="subtask__title">{"Subtasks ("+subtaskCompletedCount+" of "+subtasks.length+")"}</h3>
            <ul class="subtasks">
                {subtaskList}
            </ul>
        </Fragment>
    )
}

export default SubtaskView