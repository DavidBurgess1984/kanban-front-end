import React from "react";

const TextInput = ({placeholder,handleTextChange,value,title,errors}) => {

    // const theme = useSelector(state => state.theme)

    return (
        <div className="task__input">
            <p className="task__label ">{title}</p>
            {typeof errors.title !== 'undefined' ? <p class="task__error-msg">{errors.title}</p> : null }
            <input type="text" value={value} onChange={handleTextChange}  class={((typeof errors.title !== 'undefined') ? "text__input  text__input--error": "text__input" ) + " "} placeholder={placeholder}/>
        </div>
    )
}

export default TextInput