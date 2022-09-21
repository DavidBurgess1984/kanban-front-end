import React, { useRef } from "react"
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { editTask } from "../../app/features/task/taskSlice";
import Column from "../../components/board/column"

const ColumnContainer = (props) =>{
    const dispatch = useDispatch();
    const ref= useRef(null)

    const [{canDrop, isOver}, drop] = useDrop({
        accept: 'TASK',
        drop: () => ({column: props.column}),
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
  
            let otherTasksToChange = [];
             
            if(typeof props.otherTasks !== 'undefined'){
                otherTasksToChange = [...props.otherTasks];
            }
            
  
            if(monitor.isOver() === monitor.isOver({shallow:true})   && monitor.isOver()  && item.col !== props.column.id){
                var b = {...item.task};
              
                b.column_id = props.column.id

                let maxSortOrder = 0
                otherTasksToChange.forEach((task) => {
                    if(task.sort_order > maxSortOrder){
                        maxSortOrder = task.sort_order
                    }
                })
                b.sort_order = maxSortOrder + 1;
    
                otherTasksToChange.push(b)
    
                for(let i = 0; i< otherTasksToChange.length; i++){
                    let payload = {...otherTasksToChange[i]}
                    payload.sort_order = i;
                    dispatch(editTask(payload))
                }
    
                item.col = props.column.id
            
              // Note: we're mutating the monitor item here!
              // Generally it's better to avoid mutations,
              // but it's good here for the sake of performance
              // to avoid expensive index searches.
            //   item.index = 9999999;
            } 
             
            
            
          }
    });

    drop(ref)

    // console.log('options', {canDrop, isOver});

    return (
        <Column {...props} drop={ref} />
    )
}

export default ColumnContainer 