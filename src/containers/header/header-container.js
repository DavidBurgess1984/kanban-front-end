



import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/header/header";

const HeaderContainer = () => {

    const [navigationVisible, toggleNavigationVisible] = useState(false);
    const [addTaskLightBoxVisible, toggleAddTaskLightBoxVisible] = useState(false);
    const [lightboxContent,setLightBoxContent] = useState('add-task')
    const [boardDropdownOpen, setBoardDropdownOpen] = useState(false)

    let activeBoard

    const board = useSelector((state) => state.board);

    board.boards.forEach((boardData) => {
        if(boardData.id == board.activeBoard){
            activeBoard = {...boardData}
        }
    })

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

    const toggleEditBoardLightboxVisible = (e) => {
        toggleAddTaskLightBoxVisible(true)
            setLightBoxContent('edit-board')
            toggleNavigationVisible(false)
            setBoardDropdownOpen(false)
        
    }

    const toggleDeleteBoardLightboxVisible = (e) => {
        toggleAddTaskLightBoxVisible(true)
        setLightBoxContent('delete-board')
        toggleNavigationVisible(false)
        setBoardDropdownOpen(false)
    }

    const toggleAddBoardLightboxVisible = (e) => {

        e.preventDefault();
        e.stopPropagation();

        toggleAddTaskLightBoxVisible(true)
        setLightBoxContent('add-board')
        toggleNavigationVisible(false)

    }


    function useOutsideAlerter(ref) {
        useEffect(() => {
          /**
           * Alert if clicked on outside of element
           */
          function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
              setBoardDropdownOpen(false)
            }
          }
          // Bind the event listener
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref]);
      }

    //on new task created
    useEffect(() => {
        toggleAddTaskLightBoxVisible(false)
    },[tasks])

    useEffect(() => {
        toggleAddTaskLightBoxVisible(false)
    },[board])

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);


    if(!activeBoard){
        return null
    }

    
    return (
        <Header 
            navigationVisible={navigationVisible}
            toggleNavigationPanel={toggleNavigationPanel}
            addTaskLightBoxVisible={addTaskLightBoxVisible}
            toggleAddTaskLightboxVisible={toggleAddTaskLightboxVisible}
            boardDropdownOpen={boardDropdownOpen}
            setBoardDropdownOpen={setBoardDropdownOpen}
            lightboxContent={lightboxContent}
            activeBoard={activeBoard}
            toggleAddBoardLightboxVisible={toggleAddBoardLightboxVisible}
            toggleEditBoardLightboxVisible={toggleEditBoardLightboxVisible}
            toggleDeleteBoardLightboxVisible={toggleDeleteBoardLightboxVisible}
            wrapperRef={wrapperRef}
        />
    )

}

export default HeaderContainer