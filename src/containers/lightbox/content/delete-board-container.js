import React from "react";
import { useBoards } from "../../../app/providers/board-provider";
import DeleteBoard from "../../../components/lightbox/content/delete-board";
import { useLightbox } from "../../../app/providers/lightbox-provider";
import { useTheme } from "../../../app/providers/theme-provider";
import { useNavigate } from "react-router";

const DeleteBoardContainer = (props) => {

    const {deleteBoard} = useBoards()
    const  { toggleLightboxVisible } = useLightbox()
    const navigate = useNavigate()
    const {theme} = useTheme()
    const deleteBoardHandler = (e) => {
        e.preventDefault()
        deleteBoard(props.activeBoard.id)
        navigate('/')
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