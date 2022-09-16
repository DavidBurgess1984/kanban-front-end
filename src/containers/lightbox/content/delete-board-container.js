import React from "react";
import { useDispatch } from "react-redux";
import { deleteBoard } from "../../../app/features/board/boardSlice";
import DeleteBoard from "../../../components/lightbox/content/delete-board";

const DeleteBoardContainer = (props) => {

    const dispatch = useDispatch()

    const deleteBoardHandler = (e) => {
        e.preventDefault()
        dispatch(deleteBoard({id:props.activeBoard.id}))
        props.closeLightBox()
    }

    return (
        <DeleteBoard
            deleteBoard={deleteBoard}
            title={props.activeBoard.title}
            deleteBoardHandler={deleteBoardHandler }
            closeLightBox={props.closeLightBox}
        />
    )
}

export default DeleteBoardContainer