import React from 'react';
import {messages} from "./Messages";

/**
 * @return {null}
 */
export function StatusMessage(props) {

    let infoMessage, icon, classElement = "";

    switch(props.message) {
        case "expiredToken":
            infoMessage = messages.err_session_expired;
            break;
        case "serverError":
            infoMessage = messages.err_server_error;
            break;
        default:
            infoMessage = props.message; // if no templates match, use the text provided
            break;
    }

    switch(props.type) {
        case "info":
            icon = <i className="fa fa-info text-primary m-2" aria-hidden="true"></i>;
            classElement = "text-primary mr-5 small";
            break;
        case "error":
            icon = <i className="fa fa-exclamation-triangle text-danger m-2" aria-hidden="true"></i>;
            classElement = "text-danger mr-5 small";
            break;
        default:
            icon = <i className="fa fa-info m-2" aria-hidden="true"></i>;
            break;
    }


    if (infoMessage) {
        return (
            <React.Fragment>
                {icon}
                <span className={classElement}>{infoMessage}</span>
            </React.Fragment>
        )
    } else {
        return null;
    }
}