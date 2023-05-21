import React from "react";
import { useBoards } from "../../../app/providers/board-provider";
import DeleteBoard from "../../../components/lightbox/content/delete-board";
import { useLightbox } from "../../../app/providers/lightbox-provider";
import { useTheme } from "../../../app/providers/theme-provider";

const DeleteBoardContainer = (props) => {

    const {deleteBoard} = useBoards()
    const  { toggleLightboxVisible } = useLightbox()
    const {theme} = useTheme()
    const deleteBoardHandler = (e) => {
        e.preventDefault()
        deleteBoard(props.activeBoard.id)
        toggleLightboxVisible(false)
    }

    const closeLightBox = (e) => {
        toggleLightboxVisible(false)
    }

    return (
        <DeleteBoard
            deleteBoard={deleteBoard}
            title={props.activeBoard.title}
            deleteBoardHandler={deleteBoardHandler }
            closeLightBox={closeLightBox}
            theme={theme}
        />
    )
}

export default DeleteBoardContainer