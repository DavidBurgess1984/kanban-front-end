import React from "react";

const TextArea = ({placeholder,handleTextChange,value,title}) => {

    return (
        <div class="task__input">
            <p class="task__label">{title}</p>
            <textarea type="text" onChange={handleTextChange} class="text__area" placeholder={placeholder} value={value} />
        </div>
    )
}

export default TextArea