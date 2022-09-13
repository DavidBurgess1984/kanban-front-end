import React from "react";

const TextArea = ({placeholder,handleTextChange,value,title,errors}) => {

    return (
        <div class="task__input">
            <p class="task__label">{title}</p>
            {typeof errors.description !== 'undefined' ? <p class="task__error-msg">{errors.description}</p> : null }
            <textarea type="text" onChange={handleTextChange} class={(typeof errors.description !== 'undefined') ? "text__area text__area--error": "text__area"}  placeholder={placeholder} value={value} />
        </div>
    )
}

export default TextArea