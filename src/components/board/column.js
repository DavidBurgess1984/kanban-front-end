import React from "react"
import ColumnHeaderContainer from "../../containers/board/column-header-container"
import TaskContainer from "../../containers/board/task-item-container"

const Column = (props) =>{

    return (
        <div ref={props.drop} className="kanban__column" >
            <ColumnHeaderContainer title={props.column.name} taskCount={props.taskCount} type={props.column.name}/>
            { typeof props.columnData[props.column.id] !== 'undefined' && props.columnData[props.column.id].map((task,i) => {
                return (
                    <TaskContainer key={"task-"+props.column.id+"-"+task.id} index={i} task={task} column={props.column} otherTasks={props.columnData[props.column.id]} />
                )
            })

            }
        </div>
    )
}

export default Column