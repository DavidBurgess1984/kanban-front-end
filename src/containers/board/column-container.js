import React, { useRef } from "react";
import { useDrop } from "react-dnd";
import Column from "../../components/board/column";
import { useTasks } from "../../app/providers/task-provider";

const ColumnContainer = (props) => {
  const ref = useRef(null);
  const { editTasks } = useTasks();

  const [, drop] = useDrop({
    accept: "TASK",
    // drop: () => ({ accept:  "TASK" }),
    // canDrop: (item) => {
    //   // Allow dropping if the column is empty or the task is from a different column
    //   return !props.tasks.length || item.col !== props.column.id;
    // },
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

      let hoverIndex = 0; // Insert at the beginning when hovering over an empty column
      const dragColId = item.col;
      const hoverColId = props.column.id;

      // Handle the case when dragging to a different column with no tasks
      if (dragColId !== hoverColId && props.otherTasks.length === 0) {
        const otherTasksToChange = [...props.otherTasks];
        const draggedTask = item.task;

        // Update the column_id of the dragged task
        const updatedTask = { ...draggedTask };
        updatedTask.column_id = hoverColId;

        // Remove the dragged task from its original column
        const originalColumnTasks = [...item.originalColumnTasks];
        const dragOriginalIndex = item.index;
        originalColumnTasks.splice(dragOriginalIndex, 1);

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
        // Update the column ID and originalColumnTasks of the dragged item
        item.col = hoverColId;
        item.index = hoverIndex;
        item.originalColumnTasks = otherTasksToChange;

      }
    },
  });

  drop(ref);

  return <Column {...props} drop={ref} />;
};

export default ColumnContainer;
