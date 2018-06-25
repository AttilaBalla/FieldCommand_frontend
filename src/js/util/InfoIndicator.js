import React from 'react';

/**
 * @return {null}
 */
export function InfoIndicator(props) {

    let infoMessage = "";

    switch(props.info) {
        case "expiredToken":
            infoMessage = "Your session has expired, please log in again.";
            break;
        default:
            infoMessage = props.error; // if no templates match, use the text provided
            break;
    }

    if (infoMessage) {
        return (
            <React.Fragment>
                <i data-tip="React-tooltip" className="fa fa-info text-primary m-2" aria-hidden="true"></i>
                <span className="text-primary mr-5 small">{infoMessage}</span>
            </React.Fragment>
        )
    } else {
        return null;
    }
}