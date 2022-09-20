



import React, {  useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLightboxContent, toggleLightboxVisible } from "../../app/features/lightbox/lightboxSlice";
import { toggleNavigationVisible } from "../../app/features/navigation/navigationSlice";
import useWindowDimensions from "../../app/utilities/useWindowDimensions";
import Header from "../../components/header/header";

const HeaderContainer = () => {

    const { width } = useWindowDimensions();
    const [boardDropdownOpen, setBoardDropdownOpen] = useState(false)
    const dispatch = useDispatch();
    
    const navigation = useSelector(state => state.navigation)

    let activeBoard
    const board = useSelector((state) => state.board);

    board.boards.forEach((boardData) => {
        if(boardData.id === board.activeBoard){
            activeBoard = {...boardData}
        }
    })

    const lightbox = useSelector(state => state.lightbox)

    
    const toggleNavigationPanel = (e) => {
        
        e.preventDefault();
        e.stopPropagation();
        // alert('here')
        const inMobileMode = width <= 500
        //lightbox grey bg click
        if (e.target === e.currentTarget  && inMobileMode ) {
            dispatch(toggleNavigationVisible({isVisible:!navigation.isVisible}))
        }
    }

    const showAddTaskLightbox = (e) => {
        e.preventDefault();
        e.stopPropagation();

        //lightbox grey bg click
        if (e.target === e.currentTarget) {
            dispatch(setLightboxContent({content:'add-task'}));
            dispatch(toggleLightboxVisible({isVisible:true}));
        }
    }

    const showEditBoardLightboxVisible = (e) => {
        dispatch(setLightboxContent({content:'edit-board'}));
        dispatch(toggleLightboxVisible({isVisible:true}));
        toggleNavigationVisible({isVisible:true})
        setBoardDropdownOpen(false)
        
    }

    const showDeleteBoardLightbox = (e) => {
        dispatch(setLightboxContent({content:'delete-board'}));
        dispatch(toggleLightboxVisible({isVisible:true}));
        toggleNavigationVisible({isVisible:true})
        setBoardDropdownOpen(false)
    }

    const showAddBoardLightbox = (e) => {

        e.preventDefault();
        e.stopPropagation();

        dispatch(setLightboxContent({content:'add-board'}));
        dispatch(toggleLightboxVisible({isVisible:true}));
        toggleNavigationVisible({isVisible:true})
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
            navigationVisible={navigation.isVisible}
            toggleNavigationPanel={toggleNavigationPanel}
            showAddTaskLightbox={showAddTaskLightbox}
            boardDropdownOpen={boardDropdownOpen}
            setBoardDropdownOpen={setBoardDropdownOpen}
            lightboxContent={lightbox.content}
            activeBoard={activeBoard}
            showAddBoardLightbox={showAddBoardLightbox}
            showEditBoardLightboxVisible={showEditBoardLightboxVisible}
            showDeleteBoardLightbox={showDeleteBoardLightbox}
            width={width}
            wrapperRef={wrapperRef}
        />
    )

}

export default HeaderContainer