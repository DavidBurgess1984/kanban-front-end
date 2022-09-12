import React from "react"

const SubtaskViewItem = ({name,index,checked,toggleSubtaskStatus,id}) => {
   
   return (
    <li class="subtask__item">
        <input checked={checked} type="checkbox" class="subtask__checkbox"  id={"subtask__checkbox--"+index} onChange={() => toggleSubtaskStatus(id)}/>
        <label htmlFor={"subtask__checkbox--"+index} class="subtask__label">{name}</label>
    </li>
   )
}

export default SubtaskViewItem
