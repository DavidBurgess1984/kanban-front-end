import React from "react"

const ThemeToggle = () => {

    return (
        <div className="theme-toggle">
            <div className="theme-toggle__container">
                <div className="theme-toggle__image  theme-toggle__image--light">
                </div>
                <div className="switch switch--off">
                    <a href='#' className="switch__dial switch_dial__off" ></a>
                </div>
                <div className="theme-toggle__image  theme-toggle__image--dark">
                </div>
            </div>
        </div>
    )
}

export default ThemeToggle