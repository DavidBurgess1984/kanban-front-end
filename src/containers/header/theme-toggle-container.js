import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../app/features/theme/themeSlice";
import ThemeToggle from "../../components/header/theme-toggle";

const ThemeToggleContainer = () => {

    const theme = useSelector((state) => state.theme)
    const dispatch = useDispatch();

    const handleThemeToggle = (e) => {
        const newTheme = theme.value === 'light' ? 'dark' : 'light'
        dispatch(toggleTheme({value:newTheme}))
    }

    

    return (
        <ThemeToggle theme={theme.value} handleThemeToggle={handleThemeToggle}/>
    )
}

export default ThemeToggleContainer