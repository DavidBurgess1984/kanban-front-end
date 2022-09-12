import React from "react";
import Lightbox from "../../components/lightbox/lightbox";

const LightboxContainer = (props) => {


    return (
        <Lightbox {...props}>
            {props.children}
        </Lightbox>
    )
}

export default LightboxContainer