import React from "react"
import { useSelector } from "react-redux"

const ItemView = ({name,index,checked,toggleItemStatus,id}) => {

    const theme = useSelector(state => state.theme)
    const listItemTheme = theme.value === 'dark' ? 'list__item--dark' : '';
    const listLabelTheme = theme.value === 'dark' ? 'list__label--dark' : '';

   return (
    <li className={"list__item "+listItemTheme}>
        <input checked={checked} type="checkbox" className="list__checkbox"  id={"list__checkbox--"+index} onChange={() => toggleItemStatus(id)}/>
        <label htmlFor={"list__checkbox--"+index} className={"list__label "+listLabelTheme}>{name}</label>
    </li>
   )
}

export default ItemView
