import React from "react"

const Select = ({title,options,handleChange,selected}) => {
   
   return (
    <div class="subtask__status">
        <p class="status__title">{title}</p>
        <div class="status__wrapper">
            <select class="status__select" onChange={(e) => handleChange(e.target.value)} value={selected}>
                {options.map(option => {
                    return <option value={option.value} class="status__option">{option.name}</option>
                })}
            </select>
        </div>
    </div>
   )
}

export default Select
