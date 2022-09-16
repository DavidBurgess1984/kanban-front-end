import React from "react"

const ItemView = ({name,index,checked,toggleSubtaskStatus,id}) => {

   return (
    <li className="list__item">
        <input checked={checked} type="checkbox" className="list__checkbox"  id={"list__checkbox--"+index} onChange={() => toggleSubtaskStatus(id)}/>
        <label htmlFor={"list__checkbox--"+index} className="list__label">{name}</label>
    </li>
   )
}

export default ItemView
