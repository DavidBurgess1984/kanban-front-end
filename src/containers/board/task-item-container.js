import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import Task from "../../components/board/task-item";
import { useLightbox } from "../../app/providers/lightbox-provider";
import { useTasks } from "../../app/providers/task-provider";
import { useTheme } from "../../app/providers/theme-provider";

const TaskContainer = (props) => {
  const { setLightboxContent, toggleLightboxVisible, setTaskId } =
    useLightbox();
  const { editTasks } = useTasks();
  const {theme} = useTheme();

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

      // Determine the rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      // Get the vertical middle of the element
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine the mouse position
      const clientOffset = monitor.getClientOffset();
      // Get the distance from the top of the element
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Check if dragging downwards and above the middle of the element
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Check if dragging upwards and below the middle of the element
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
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

        let newTasks = [];
        // Update the sort_order of tasks in the new column
        for (let i = 0; i < otherTasksToChange.length; i++) {
          let payload = { ...otherTasksToChange[i] };
          payload.sort_order = i;

          newTasks.push(payload);
        }

        // Update the sort_order of tasks in the original column
        for (let i = 0; i < originalColumnTasks.length; i++) {
          let payload = { ...originalColumnTasks[i] };
          payload.sort_order = i;

          newTasks.push(payload);
        }

        // Update the tasks in the database or state
        editTasks(newTasks);

        // Update the index and column ID of the dragged item
        item.index = hoverIndex;
        item.col = hoverColId;

        console.log("Dragged item updated:", item);
      } else {
        // Update tasks within the same column
        const otherTasksToChange = [...props.otherTasks];
        const updatedTask = otherTasksToChange[dragIndex];

        otherTasksToChange.splice(dragIndex, 1);

        // Insert the dragged task into the same column at the hover index
        otherTasksToChange.splice(hoverIndex, 0, updatedTask);

        let newTasks = [];
        // Update the sort_order of tasks in the same column
        for (let i = 0; i < otherTasksToChange.length; i++) {
          let payload = { ...otherTasksToChange[i] };
          payload.sort_order = i;

          newTasks.push(payload);
        }

        // Update the tasks in the database or state
        editTasks(newTasks);

        // Update the index and column ID of the dragged item
        item.index = hoverIndex;
        item.col = hoverColId;
        item.otherTasks = otherTasksToChange;

        console.log("Dragged item updated:", item);
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
  });

  const opacity = isDragging ? 0.4 : 1;

  drag(drop(ref));

  return (
    <Task
      task={props.task}
      viewTask={viewTask}
      opacity={opacity}
      drag={ref}
      theme={theme}
    />
  );
};

export default TaskContainer;
