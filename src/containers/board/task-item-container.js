import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import Task from "../../components/board/task-item";
import { useLightbox } from "../../app/providers/lightbox-provider";
import { useTasks } from "../../app/providers/task-provider";

const TaskContainer = React.memo((props) => {
  const { setLightboxContent, toggleLightboxVisible, setTaskId } =
    useLightbox();
  const { editTasks,editTaskColumn } = useTasks();

  const viewTask = (taskId) => {
    setTaskId(taskId);
    setLightboxContent("view-task");
    toggleLightboxVisible(true);
  };

  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: "TASK",
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
    }),
    // Handle hover event for drag and drop functionality
    hover(item, monitor) {
      // Check if the reference element exists
      if (!ref.current) {
        return;
      }

      // Retrieve necessary information for the drag and hover items
      const dragIndex = item.index;
      const hoverIndex = props.index;
      const dragColId = item.col;
      const hoverColId = props.column.id;

      // Don't replace items with themselves within the same column
      if (dragIndex === hoverIndex && dragColId === hoverColId) {
        return;
      }

      if (dragColId !== hoverColId) {
        // Update tasks when dragging to a different column
        const otherTasksToChange = [...props.otherTasks];
        const originalColumnTasks = [...item.originalColumnTasks];
        const updatedTask = originalColumnTasks[dragIndex];

        // Update the column ID of the dragged task
        updatedTask.column_id = hoverColId;

        // Remove the dragged task from its original column
        originalColumnTasks.splice(dragIndex, 1);

        // Insert the dragged task into the new column at the hover index
        otherTasksToChange.splice(hoverIndex, 0, updatedTask);

        const newTasks = otherTasksToChange.map((task,index) => ({
          ...task,
          sort_order:index
        }))

        // Update the tasks in the database or state
        editTasks(newTasks);

        // Update the index and column ID of the dragged item
        item.index = hoverIndex;
        item.col = hoverColId;
        
        item.originalColumnTasks = otherTasksToChange;

      } else {
        // Update tasks within the same column
        const otherTasksToChange = [...props.otherTasks];
        const updatedTask = otherTasksToChange[dragIndex];

        otherTasksToChange.splice(dragIndex, 1);

        // Insert the dragged task into the same column at the hover index
        otherTasksToChange.splice(hoverIndex, 0, updatedTask);

        const newTasks = otherTasksToChange.map((task,index) => ({
          ...task,
          sort_order:index
        }))
        // Update the tasks in the database or state
        editTasks(newTasks);

        // Update the index and column ID of the dragged item
        item.index = hoverIndex;
        item.col = hoverColId;
        item.originalColumnTasks = otherTasksToChange;

      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: {
      task: props.task,
      index: props.index,
      col: props.column.id,
      originalColumnTasks: props.otherTasks,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const didDrop = monitor.didDrop()
      if (didDrop) {
        editTaskColumn({
          task_id:item.task.id,
          column_id:item.col
        })
      }
    },
  });

  const opacity = isDragging ? 0.4 : 1;

  drag(drop(ref));

  return (
    <Task
      task={props.task}
      viewTask={viewTask}
      opacity={opacity}
      drag={ref}
    />
  );
});

export default TaskContainer;
