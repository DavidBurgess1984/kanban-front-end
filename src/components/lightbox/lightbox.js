import React from "react";

const Lightbox = (props) => {

    return (
        <div class="lightbox" onClick={(e) => props.closeLightBox(e)}>
            <div class="lightbox__container">
                {props.children}
            </div>
        </div>
    )
}

export default Lightbox