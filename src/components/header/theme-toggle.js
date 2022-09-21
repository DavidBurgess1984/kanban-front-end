import React from "react"

const ThemeToggle = (props) => {

    const switchClass = props.theme === 'light' ? 'switch--off' : 'switch--on'
    const dialClass = props.theme === 'light' ? 'switch__dial--off' : 'switch__dial--on'
    const themeClass = props.theme === 'dark' ? 'theme-toggle--dark' : ''


    console.log(props.theme)
    return (
        <div className={"theme-toggle "+themeClass}>
            <div className="theme-toggle__container">
                <div className="theme-toggle__image  theme-toggle__image--light">
                </div>
                <div className={"switch "+switchClass} onClick={() => props.handleThemeToggle()}>
                    <a href='#' className={"switch__dial "+ dialClass} ></a>
                </div>
                <div className="theme-toggle__image  theme-toggle__image--dark">
                </div>
            </div>
        </div>
    )
}

export default ThemeToggle