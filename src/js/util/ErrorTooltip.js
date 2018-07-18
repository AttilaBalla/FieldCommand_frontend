import React from 'react';
import ReactTooltip from 'react-tooltip'

/**
 * @return {null}
 */
export function ErrorTooltip(props) {

    let errorMessage = "";

    switch(props.error) {
        case "serverError":
            errorMessage = "Internal error occurred. If this alert persists, contact the site owner.";
            break;
        case "swrNetError":
            errorMessage = "Unable to retrieve status. This might be due to Fieldcommand's backend or SWR.net's backend.";
            break;
        case "activationError":
            errorMessage = "Unable to activate the account. The key provided is invalid!";
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