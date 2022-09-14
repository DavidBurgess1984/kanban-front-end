import React from "react";

const Lightbox = (props) => {

    return (
        <div className="lightbox" onClick={(e) => props.closeLightBox(e)}>
            <div className="lightbox__container">
                {props.children}
            </div>
        </div>
    )
}

export default Lightbox