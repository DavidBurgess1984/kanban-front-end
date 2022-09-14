import React from "react";

const Task = (props) => {

    return (
        <div className="kanban__task" onClick={(e) => props.viewTask(props.task.id)}>
            <h2 className="task__title">{props.task.name}</h2>
            {typeof props.task !== "undefined"  && <p className="subtask__info">{props.task.subtasks.filter((subtask) => subtask.completed).length} of {props.task.subtasks.length} subtasks</p>}
        </div>
    )
}

export default Task