import React from "react";
import { useSelector } from "react-redux";

const TextInput = ({placeholder,handleTextChange,value,title,errors}) => {

    const theme = useSelector(state => state.theme)
    console.log(errors)
    const titleTheme = theme.value === 'dark' ? 'task__label--dark': '';
    const inputTheme = theme.value === 'dark' ? 'text__input--dark': '';
    return (
        <div className="task__input">
            <p className={"task__label "+titleTheme}>{title}</p>
            {typeof errors.title !== 'undefined' ? <p class="task__error-msg">{errors.title}</p> : null }
            <input type="text" value={value} onChange={handleTextChange}  class={((typeof errors.title !== 'undefined') ? "text__input  text__input--error": "text__input" ) + " "+inputTheme} placeholder={placeholder}/>
        </div>
    )
}

export default TextInput