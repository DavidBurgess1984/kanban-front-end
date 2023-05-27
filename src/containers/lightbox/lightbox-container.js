import React, { useEffect, useRef } from "react";

import { useBoards } from "../../app/providers/board-provider";
import { useLightbox } from "../../app/providers/lightbox-provider";
import Lightbox from '../../components/lightbox/lightbox.js'

const LightboxContainer = (props) => {

    const {boards,activeBoard} = useBoards();
    const {content,taskId,isVisible,toggleLightboxVisible,setTaskId} = useLightbox()
    let activeBoardData


    boards.forEach((boardData) => {
        if(boardData.id === activeBoard){
            activeBoardData = {...boardData}
        }
    })

    // const board = useSelector((state) => state.board);



    function useOutsideAlerter(ref) {
        useEffect(() => {
          /**
           * Alert if clicked on outside of element
           */
          function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
              setTaskId(-1)
              toggleLightboxVisible(false)
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

    useEffect(() => {
      if(isVisible ){
        toggleLightboxVisible(false)
      }
    },[boards])

    if(!isVisible){
        return null
    }

    

    return (
        <Lightbox lightbox={content} wrapperRef={wrapperRef} activeBoard={activeBoardData } taskId={taskId} />
    )
}



export default LightboxContainer