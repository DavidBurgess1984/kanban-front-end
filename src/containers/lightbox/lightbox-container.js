import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTaskId, toggleLightboxVisible } from "../../app/features/lightbox/lightboxSlice";
import Lightbox from "../../components/lightbox/lightbox";

const LightboxContainer = (props) => {

    const dispatch = useDispatch();
    const lightbox = useSelector(state => state.lightbox)
    const theme = useSelector(state => state.theme)
    let activeBoard

    const board = useSelector((state) => state.board);

    board.boards.forEach((boardData) => {
        if(boardData.id === board.activeBoard){
            activeBoard = {...boardData}
        }
    })

    function useOutsideAlerter(ref) {
        useEffect(() => {
          /**
           * Alert if clicked on outside of element
           */
          function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
              dispatch(setTaskId({id:-1}))
              dispatch(toggleLightboxVisible({isVisible:false}))
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
      if(lightbox.isVisible ){
        dispatch(toggleLightboxVisible({isVisible:false}))
      }
    },[board.boards])

    if(!lightbox.isVisible){
        return null
    }

    return (
        <Lightbox lightbox={lightbox.content} wrapperRef={wrapperRef} activeBoard={activeBoard} taskId={lightbox.taskId} theme={theme.value} />
    )
}



export default LightboxContainer