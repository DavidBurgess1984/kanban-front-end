import React from "react";

const ColumnHeader = (props) => {

    let statusNameClass = ""

    switch(props.type){
        case "todo":
            statusNameClass = "kanban-status__name--todo"
            break;
        case "doing":
            statusNameClass = "kanban-status__name--doing"
            break;
        case "done":
            statusNameClass = "kanban-status__name--done"
            break;
    }

    return (
        <div className={"kanban-status__name "+statusNameClass}>
            {props.title + " (" + props.taskCount + ")" }
        </div>
    )
}

export default ColumnHeader