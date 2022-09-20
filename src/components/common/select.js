import React from "react"

const Select = ({title,options,handleChange,selected,errors}) => {

   return (
    <div className="list__status">
        <p className="status__title">{title}</p>
        {typeof errors!== 'undefined' && typeof errors.status !== 'undefined' ? <p className="task__error-msg task__error-msg--right">{errors.status}</p> : null }
        <div className={(typeof errors!== 'undefined' &&  typeof errors.status !== 'undefined') ? "status__wrapper status__wrapper--error" : "status__wrapper"} >
            <select class={( typeof errors!== 'undefined' && typeof errors.status !== 'undefined') ? "status__select status__select--error": "status__select" }  onChange={(e) => handleChange(e.target.value)} value={selected}>
                <option value={-1} className="status__option" default disabled>Select a column</option>
                {options.map(option => {
                    return <option value={option.value}className="status__option">{option.name}</option>
                })}
            </select>
        </div>
    </div>
   )
}

export default Select
