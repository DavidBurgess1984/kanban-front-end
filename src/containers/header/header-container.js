



import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/header/header";

const HeaderContainer = () => {

    const [navigationVisible, toggleNavigationVisible] = useState(false);
    const [addTaskLightBoxVisible, toggleAddTaskLightBoxVisible] = useState(false);
    // const [addBoardLightBoxVisible, toggleAddBoardLightBoxVisible] = useState(false);
    const [lightboxContent,setLightBoxContent] = useState('add-task')
    const [boardDropdownOpen, setBoardDropdownOpen] = useState(false)

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
            setLightBoxContent('add-task')
            toggleAddTaskLightBoxVisible(!addTaskLightBoxVisible)
        }
    }

    const toggleAddBoardLightboxVisible = (e) => {

        e.preventDefault();
        e.stopPropagation();

        //lightbox grey bg click
        // if (e.target === e.currentTarget) {
            toggleAddTaskLightBoxVisible(true)
            setLightBoxContent('add-board')
            toggleNavigationVisible(false)
            // toggleAddBoardLightBoxVisible(true)
        // }
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
            boardDropdownOpen={boardDropdownOpen}
            setBoardDropdownOpen={setBoardDropdownOpen}
            lightboxContent={lightboxContent}
            toggleAddBoardLightboxVisible={toggleAddBoardLightboxVisible}
        />
    )

}

export default HeaderContainer