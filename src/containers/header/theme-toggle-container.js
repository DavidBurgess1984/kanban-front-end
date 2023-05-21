import React from "react";
import ThemeToggle from "../../components/header/theme-toggle";
import { useTheme } from "../../app/providers/theme-provider";

const ThemeToggleContainer = () => {


    const {theme,toggleTheme} = useTheme()
    const handleThemeToggle = (e) => {
        const newTheme = theme=== 'light' ? 'dark' : 'light'
        toggleTheme(newTheme)
    }

    

    return (
        <ThemeToggle theme={theme} handleThemeToggle={handleThemeToggle}/>
    )
}

export default ThemeToggleContainer