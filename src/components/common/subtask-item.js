import React from "react"

const SubtaskItem = ({placeholder,index,value,editSubtaskHandler,deleteSubtaskHandler,errors}) => {

   return (
        <li className="subtask__item--edit">
            {typeof errors.subtasks !== 'undefined' && errors.subtasks[index] !== 'undefined' ? <p class="task__error-msg task__error-msg--subtask">{errors.subtasks[index] }</p> : null }
            <input type="text"  value={value} class={(typeof errors.subtasks !== 'undefined' && typeof errors.subtasks[index]  !== 'undefined') ? "text__input text__input--error ": "text__input" } placeholder={placeholder} onChange={(e) => editSubtaskHandler(index,e.target.value)}/>
            <a href='#' class={typeof errors.subtasks !== 'undefined' && typeof errors.subtasks[index] !== 'undefined' ? "subtask__remove  subtask__remove--red" : "subtask__remove"} onClick={(e) => deleteSubtaskHandler(index)}></a>
        </li>
   )
}

export default SubtaskItem
