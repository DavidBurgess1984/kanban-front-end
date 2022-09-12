import React from "react"

const SubtaskItem = ({placeholder,index,value,editSubtaskHandler,deleteSubtaskHandler}) => {
   
   return (
        <li class="subtask__item--edit">
            <input type="text"  value={value} class="text__input" placeholder={placeholder} onChange={(e) => editSubtaskHandler(index,e.target.value)}/>
            <a href='#' class="subtask__remove" onClick={(e) => deleteSubtaskHandler(index)}></a>
        </li>
   )
}

export default SubtaskItem
