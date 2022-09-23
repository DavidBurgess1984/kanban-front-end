import React from "react";
import { useSelector } from "react-redux";

const TextArea = ({placeholder,handleTextChange,value,title,errors}) => {

    const theme = useSelector(state => state.theme)
    const titleTheme = theme.value === 'dark' ? 'task__label--dark': '';
    const inputTheme = theme.value === 'dark' ? 'text__area--dark': '';
    return (
        <div className="task__input">
            <p className={"task__label " +titleTheme}>{title}</p>
            {typeof errors.description !== 'undefined' ? <p className="task__error-msg">{errors.description}</p> : null }
            <textarea type="text" onChange={handleTextChange} class={((typeof errors.description !== 'undefined') ? "text__area text__area--error": "text__area")+ " "+inputTheme}  placeholder={placeholder} value={value} />
        </div>
    )
}

export default TextArea