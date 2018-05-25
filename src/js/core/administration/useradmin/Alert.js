//I put it here for now but most likely this will be common
import React from "react";

export const alertTypes = {
    NEUTRAL: {
        classElement: "alert alert-secondary",
    },
    SUCCESS: {
        classElement: "alert alert-success",
    },
    ERROR: {
        classElement: "alert alert-danger",
    }
};

export function Alert(props) {

    let classElement = "";

    switch(props.alertType) {
        case alertTypes.NEUTRAL:
            classElement = alertTypes.NEUTRAL.classElement;
            break;
        case alertTypes.SUCCESS:
            classElement = alertTypes.SUCCESS.classElement;
            break;
        case alertTypes.ERROR:
            classElement = alertTypes.ERROR.classElement;
            break;
    }

    return(
        <div className={classElement} role="alert">
            {props.text}
        </div>
    )
}