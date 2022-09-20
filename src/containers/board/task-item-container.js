import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { setLightboxContent, setTaskId, toggleLightboxVisible } from "../../app/features/lightbox/lightboxSlice";
import { editTask } from "../../app/features/task/taskSlice";
import Task from "../../components/board/task-item";

const TaskContainer = (props) => {

    const dispatch = useDispatch()

    const viewTask = (taskId) => {
        dispatch(setTaskId({id:taskId}))
        dispatch(setLightboxContent({content:'view-task'}));
        dispatch(toggleLightboxVisible({isVisible:true}))
    }

    
    
    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: "TASK",
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            isOverCurrent: monitor.isOver({ shallow: true }),
            canDrop: monitor.canDrop(),
        }),
        hover(item, monitor) {
          if (!ref.current) {
            return;
          }
          const dragIndex = item.index;
          const hoverIndex = props.index;

        //   console.log(item.col)
        //     console.log(props.column.id)
        //     console.log(monitor.isOver({ shallow: true }))
        //     console.log(monitor.isOver())
        //   console.log(otherTasksToChange)
        //   console.log(dragIndex)
        //   console.log(hoverIndex)
          // Don't replace items with themselves
        //   if (dragIndex === hoverIndex) {
        //     return;
        //   }
          // Determine rectangle on screen
          const hoverBoundingRect = ref.current?.getBoundingClientRect();
          // Get vertical middle
          const hoverMiddleY =
            (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
          // Determine mouse position
          const clientOffset = monitor.getClientOffset();
          // Get pixels to the top
          const hoverClientY = clientOffset.y - hoverBoundingRect.top;
          // Only perform the move when the mouse has crossed half of the items height
          // When dragging downwards, only move when the cursor is below 50%
          // When dragging upwards, only move when the cursor is above 50%
          // Dragging downwards
          if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
          }
          // Dragging upwards
          if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
          }
          // Time to actually perform the action

        if(item.col === props.column.id){
            // console.log('found match')
            let otherTasksToChange = [...props.otherTasks];

            //   console.log(props.otherTasks)
            var b = otherTasksToChange [hoverIndex];
            //   console.log(b)
            otherTasksToChange [hoverIndex] = otherTasksToChange [dragIndex];
            otherTasksToChange [dragIndex] = b;

            for(let i = 0; i< otherTasksToChange.length; i++){
                let payload = {...otherTasksToChange[i]}
                payload.sort_order = i;
                dispatch(editTask(payload))
            }

            // item.index = hoverIndex;
        } else {
            let otherTasksToChange = [...props.otherTasks];

            var b = {...item.task};

            
            b.column_id = props.column.id

            otherTasksToChange.splice(hoverIndex,0,b)

            for(let i = 0; i< otherTasksToChange.length; i++){
                let payload = {...otherTasksToChange[i]}
                payload.sort_order = i;
                dispatch(editTask(payload))
            }

            item.col = props.column.id
        }
          // Note: we're mutating the monitor item here!
          // Generally it's better to avoid mutations,
          // but it's good here for the sake of performance
          // to avoid expensive index searches.
          item.index = hoverIndex;
          
          
        }
      });

    const [{ isDragging }, drag] = useDrag({
        type: "TASK",
        item: { task:props.task,index:props.index,col:props.column.id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        // hover:(item,monitor) => {
        //     const dropResult = monitor.getDropResult();
        //     console.log(item)
        //     console.log(dropResult)
        // }
    });

    const opacity = isDragging ? 0.4 : 1;

    drag(drop(ref))

    return (
        <Task  task={props.task}  viewTask={viewTask} opacity={opacity} drag={ref}/>
    )
}

export default TaskContainer