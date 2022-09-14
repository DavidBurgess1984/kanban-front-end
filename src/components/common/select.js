import React from "react"

const Select = ({title,options,handleChange,selected}) => {
   
   return (
    <div className="subtask__status">
        <p className="status__title">{title}</p>
        <div className="status__wrapper">
            <select className="status__select" onChange={(e) => handleChange(e.target.value)} value={selected}>
                {options.map(option => {
                    return <option value={option.value}className="status__option">{option.name}</option>
                })}
            </select>
        </div>
    </div>
   )
}

export default Select
