import React, { Fragment } from "react"

const DeleteBoard = (props) => {
    const directClick = true;
    return (
        <Fragment>
            <div className="lightbox__header">
                <h2 className="lightbox__title  lightbox__title--red">Delete Board?</h2>
            </div>
            <div className="lightbox__content">
                <p className="lightbox__description">Are you sure you want to delete the '{props.title}' board? This action cannot be reversed and all associated data will be removed.</p>
                <div className="lightbox__confirm-container">
                    <div className="lightbox__button-container">
                        <a className="form__button form__button--danger" onClick={(e) => props.deleteBoardHandler(e)}>Delete</a>
                    </div>
                    <div className="lightbox__button-container">
                        <a className="form__button form__button--secondary" onClick={(e) => props.closeLightBox(e)}>Cancel</a>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default DeleteBoard