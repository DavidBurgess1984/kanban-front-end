import React from "react"
import SubtaskItem from "./subtask-item"

const Subtask = ({subTasks,addSubtask,editSubtaskHandler,deleteSubtaskHandler,errors,title,addSubtaskBtnTxt,type}) => {

    let subtaskList = [];

    subTasks.map((subtask,i) => {

        let placeholderText = ""
        
        if(i == 0){
            if(typeof type !== "undefined" && type == 'columns'){
                placeholderText = "e.g. In Backlog";
            } else {
                placeholderText = "e.g. Drink coffee & smile";
            }
            
        } else if (i == 1){
            if(typeof type !== "undefined"  && type == 'columns'){
                placeholderText = "e.g. Assigned";
            } else {
                placeholderText =  "e.g. Make coffee" 
            }
        }

        subtaskList.push(<SubtaskItem key={"subtask-item-"+i} placeholder={placeholderText} value={subtask.name} index={i} editSubtaskHandler={editSubtaskHandler} deleteSubtaskHandler={deleteSubtaskHandler} errors={errors}/>)
    });

    return (
        <div className="task__input">
            <h3 className="subtask__title">{title}</h3>
            <ul className="subtasks">
                {subtaskList}
                <li className="subtask__item--edit">
                    <a className="form__button form__button--secondary" onClick={addSubtask}>+ {addSubtaskBtnTxt}</a>
                </li>
            </ul>
        </div>
    )
}

export default Subtask