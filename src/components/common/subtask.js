import React from "react"
import SubtaskItem from "./subtask-item"

const Subtask = ({subTasks,addSubtask,editSubtaskHandler,deleteSubtaskHandler}) => {

    let subtaskList = [];
    console.log(subTasks);
    subTasks.map((subtask,i) => {

        let placeholderText = ""
        
        if(i == 0){
            placeholderText = "e.g. Drink coffee & smile";
        } else if (i == 1){
            placeholderText =  "e.g. Make coffee" 
        }

        subtaskList.push(<SubtaskItem key={"subtask-item-"+i} placeholder={placeholderText} value={subtask.name} index={i} editSubtaskHandler={editSubtaskHandler} deleteSubtaskHandler={deleteSubtaskHandler} />)
    });

    return (
        <div class="task__input">
            <h3 class="subtask__title">Subtasks</h3>
            <ul class="subtasks">
                {subtaskList}
                <li class="subtask__item--edit">
                    <a class="form__button form__button--secondary" onClick={addSubtask}>+ Add New Subtask</a>
                </li>
            </ul>
        </div>
    )
}

export default Subtask