import React, { Fragment } from "react";


const Error = () => {

    return (
      <Fragment>
        <div className="error_box">
        <h1 className="error_box--title">Error!</h1>
        <p className="error_box--message">We can't seem to find that board!</p>
        </div>
      </Fragment>

    )
}

export default Error