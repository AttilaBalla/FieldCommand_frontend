import React from 'react';
import ReactTooltip from 'react-tooltip'
import {messages} from "./messages";

/**
 * @return {null}
 */
export function ErrorTooltip(props) {

    let errorMessage = "";

    switch(props.error) {
        case "serverError":
            errorMessage = messages.err_server_error;
            break;
        case "swrNetError":
            errorMessage = messages.err_swr_api;
            break;
        case "activationError":
            errorMessage = messages.acc_cannot_activate;
            break;
        default:
            errorMessage = props.error; // if no templates match, use the text provided
            break;
    }

    if (errorMessage) {
        return (
            <React.Fragment>
                <i data-tip="React-tooltip" className="fa fa-exclamation-triangle text-danger m-2" aria-hidden="true"></i>
                <ReactTooltip place="bottom" type="error" effect="solid">
                    {errorMessage}
                </ReactTooltip>
            </React.Fragment>
        )
    } else {
        return null;
    }
}