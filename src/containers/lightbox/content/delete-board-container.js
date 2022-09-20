import React from "react";
import { useDispatch } from "react-redux";
import { deleteBoard } from "../../../app/features/board/boardSlice";
import { toggleLightboxVisible } from "../../../app/features/lightbox/lightboxSlice";
import DeleteBoard from "../../../components/lightbox/content/delete-board";

const DeleteBoardContainer = (props) => {

    const dispatch = useDispatch()

    const deleteBoardHandler = (e) => {
        e.preventDefault()
        dispatch(deleteBoard({id:props.activeBoard.id}))
        dispatch(toggleLightboxVisible({isVisible:false}))
    }

    const closeLightBox = (e) => {
        dispatch(toggleLightboxVisible({isVisible:false}))
    }

    return (
        <DeleteBoard
            deleteBoard={deleteBoard}
            title={props.activeBoard.title}
            deleteBoardHandler={deleteBoardHandler }
            closeLightBox={closeLightBox}
        />
    )
}

export default DeleteBoardContainer