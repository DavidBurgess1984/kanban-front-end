import React from "react"
// import { useSelector } from "react-redux"

const ItemEdit = ({placeholder,index,value,editItemHandler,deleteItemHandler,errors}) => {

    // const theme = useSelector(state => state.theme)
    const inputTheme = /*theme.value === 'dark' ? 'text__input--dark':*/ '';

   return (
        <li className="list__item--edit">
            {typeof errors.items !== 'undefined' && errors.items[index] !== 'undefined' ? <p class="task__error-msg task__error-msg--subtask">{errors.items[index] }</p> : null }
            <input type="text"  value={value} class={((typeof errors.items !== 'undefined' && typeof errors.items[index]  !== 'undefined') ? "text__input text__input--error ": "text__input") +" "+inputTheme } placeholder={placeholder} onChange={(e) => editItemHandler(index,e.target.value)}/>
            <a href='#' class={typeof errors.items !== 'undefined' && typeof errors.items[index] !== 'undefined' ? "list__remove  list__remove--red" : "list__remove"} onClick={(e) => deleteItemHandler(index)}></a>
        </li>
   )
}

export default ItemEdit
