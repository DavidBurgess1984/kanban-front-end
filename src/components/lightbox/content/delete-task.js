import React, { Fragment } from "react"

const DeleteTask = (props) => {
    const directClick = true;
    return (
        <Fragment>
            <div class="lightbox__header">
                <h2 class="lightbox__title  lightbox__title--red">Delete Task?</h2>
            </div>
            <div class="lightbox__content">
                <p class="lightbox__description">Are you sure you want to delete the '{props.title}' task? This action cannot be reversed.</p>
                <div class="lightbox__confirm-container">
                    <div class="lightbox__button-container">
                        <a class="form__button form__button--danger" onClick={(e) => props.deleteTaskHandler(e)}>Delete</a>
                    </div>
                    <div class="lightbox__button-container">
                        <a class="form__button form__button--secondary" onClick={(e) => props.closeLightBox(e)}>Cancel</a>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default DeleteTask