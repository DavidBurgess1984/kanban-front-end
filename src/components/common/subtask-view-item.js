import React from "react"

const SubtaskViewItem = ({name,index,checked,toggleSubtaskStatus,id}) => {

   return (
    <li className="subtask__item">
        <input checked={checked} type="checkbox" className="subtask__checkbox"  id={"subtask__checkbox--"+index} onChange={() => toggleSubtaskStatus(id)}/>
        <label htmlFor={"subtask__checkbox--"+index} className="subtask__label">{name}</label>
    </li>
   )
}

export default SubtaskViewItem
