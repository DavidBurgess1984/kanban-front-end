import React from "react";

const Task = (props) => {


    return (
        <div ref={props.drag} className="kanban__task" style={{opacity:props.opacity}} onClick={(e) => props.viewTask(props.task.id)}>
            <h2 className="task__title">{props.task.name}</h2>
            {typeof props.task !== "undefined"  && props.task.subtasks.length >0 && <p className="list__info">{props.task.subtasks.filter((subtask) => subtask.complete).length} of {props.task.subtasks.length} subtasks</p>}
        </div>
    )
}

export default Task