



import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/header/header";

const HeaderContainer = () => {

    const [navigationVisible, toggleNavigationVisible] = useState(false);
    const [addTaskLightBoxVisible, toggleAddTaskLightBoxVisible] = useState(false);

    const tasks = useSelector((state) => state.tasks.tasks)

    const toggleNavigationPanel = (e) => {
        
        e.preventDefault();
        e.stopPropagation();

        //lightbox grey bg click
        if (e.target === e.currentTarget) {
            toggleNavigationVisible(!navigationVisible)
        }
    }


    const toggleAddTaskLightboxVisible = (e) => {
        e.preventDefault();
        e.stopPropagation();

        //lightbox grey bg click
        if (e.target === e.currentTarget) {
            toggleAddTaskLightBoxVisible(!addTaskLightBoxVisible)
        }
    }

    //on new task created
    useEffect(() => {
        toggleAddTaskLightBoxVisible(false)
    },[tasks])

    return (
        <Header 
            navigationVisible={navigationVisible}
            toggleNavigationPanel={toggleNavigationPanel}
            addTaskLightBoxVisible={addTaskLightBoxVisible}
            toggleAddTaskLightboxVisible={toggleAddTaskLightboxVisible}
        />
    )

}

export default HeaderContainer