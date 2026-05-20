import React from "react";
import classNames from "classnames";
import "./Spinner.css";



const Spinner = (className) => {

    const classes = classNames("lds-roller",className)

    return(
    <div>
        <div className={classes}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
    )


}

export default Spinner;