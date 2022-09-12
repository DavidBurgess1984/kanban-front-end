import React from "react";

const Task = (props) => {

    return (
        <div class="kanban__task" onClick={(e) => props.viewTask(props.task.id)}>
            <h2 class="task__title">{props.task.name}</h2>
            {typeof props.task !== "undefined"  && <p class="subtask__info">{props.task.subtasks.filter((subtask) => subtask.completed).length} of {props.task.subtasks.length} subtasks</p>}
        </div>
    )
}

export default Task