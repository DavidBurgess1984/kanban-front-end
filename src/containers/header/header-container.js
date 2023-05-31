



import React, {  useEffect, useRef, useState } from "react";
import { useBoards } from "../../app/providers/board-provider";
import useWindowDimensions from "../../app/utilities/useWindowDimensions";
import Header from "../../components/header/header";
import { useLightbox } from "../../app/providers/lightbox-provider";
import { useMenu } from "../../app/providers/menu-provider";
import { useTheme } from "../../app/providers/theme-provider";

const HeaderContainer = () => {

    // alert('here')
    const { setLightboxContent, toggleLightboxVisible,content } = useLightbox()
    const { width } = useWindowDimensions();
    const [boardDropdownOpen, setBoardDropdownOpen] = useState(false)
    const {theme} = useTheme()
    const {visible,toggleMenuVisible} =  useMenu()
    const {activeBoard} = useBoards()

    const inMobileMode = width <= 700
    
    const toggleNavigationPanel = (e) => {
        
        e.preventDefault();
        e.stopPropagation();
        //lightbox grey bg click
        if (e.target === e.currentTarget  && inMobileMode ) {
            toggleMenuVisible(!visible)
        }
    }

    const showAddTaskLightbox = (e) => {
        e.preventDefault();
       setLightboxContent('add-task');
        toggleLightboxVisible(true);

    }

    const showEditBoardLightboxVisible = (e) => {
        setLightboxContent('edit-board');
        toggleLightboxVisible(true);
        
        if(inMobileMode){
            toggleMenuVisible(false)
        } else {
            toggleMenuVisible(true)
        }
        
        setBoardDropdownOpen(false)
        
    }

    const showDeleteBoardLightbox = (e) => {
        setLightboxContent('delete-board');
        toggleLightboxVisible(true);
        toggleMenuVisible(true)
        setBoardDropdownOpen(false)
    }

    const showAddBoardLightbox = (e) => {

        e.preventDefault();
        e.stopPropagation();

        setLightboxContent('add-board');
        toggleLightboxVisible(true);
        toggleMenuVisible(true)
        setBoardDropdownOpen(false)
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


      
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    if(!activeBoard){
        return null
    }
    
    return (
        <Header 
            navigationVisible={visible}
            toggleNavigationPanel={toggleNavigationPanel}
            showAddTaskLightbox={showAddTaskLightbox}
            boardDropdownOpen={boardDropdownOpen}
            setBoardDropdownOpen={setBoardDropdownOpen}
            lightboxContent={content}
            activeBoard={activeBoard}
            showAddBoardLightbox={showAddBoardLightbox}
            showEditBoardLightboxVisible={showEditBoardLightboxVisible}
            showDeleteBoardLightbox={showDeleteBoardLightbox}
            width={width}
            wrapperRef={wrapperRef}
            theme={theme}
        />
    )

}

export default HeaderContainer