import React from "react"
// import { useSelector } from "react-redux"

const Select = ({title,options,handleChange,selected,errors}) => {

    // const theme = useSelector(state => state.theme)
    const titleTheme = /*theme.value === 'dark' ? 'task__label--dark':*/ '';
    const statusSelectTheme = /*theme.value === 'dark' ? 'status__select--dark' :*/ ''
    const statusOptionTheme = /*theme.value === 'dark' ? 'status__option--dark' :*/ ''
   return (
    <div className="list__status ">
        <p className={"status__title "+titleTheme}>{title}</p>
        {typeof errors!== 'undefined' && typeof errors.status !== 'undefined' ? <p className="task__error-msg task__error-msg--right">{errors.status}</p> : null }
        <div className={(typeof errors!== 'undefined' &&  typeof errors.status !== 'undefined') ? "status__wrapper status__wrapper--error" : "status__wrapper"} >
            <select class={( typeof errors!== 'undefined' && typeof errors.status !== 'undefined') ? "status__select status__select--error ": "status__select "+statusSelectTheme }  onChange={(e) => handleChange(e.target.value)} value={selected}>
                <option value={-1} className="status__option" default disabled>Select a column</option>
                {options.map(option => {
                    return <option value={option.value} className={"status__option "+statusOptionTheme}>{option.name}</option>
                })}
            </select>
        </div>
    </div>
   )
}

export default Select
