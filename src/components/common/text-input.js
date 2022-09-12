import React from "react";

const TextInput = ({placeholder,handleTextChange,value,title}) => {

    return (
        <div class="task__input">
            <p class="task__label">{title}</p>
            <input type="text" value={value} onChange={handleTextChange}  class="text__input" placeholder={placeholder}/>
        </div>
    )
}

export default TextInput