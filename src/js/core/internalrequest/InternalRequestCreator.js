import React from "react";
import {QuillEditor} from "../../util/QuillEditor";
import {alertTypes} from "../../util/Alert";
import {sendInternalRequest} from "../../util/APIUtils";
import {messages} from "../../util/messages";

export class InternalRequestCreator extends React.Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(internalRequest){

        let internalRequestData = internalRequest;

        if(internalRequestData.title.length < 6 || internalRequestData.content.length < 20) {
            this.props.sendAlert({
                alertType: alertTypes.NEUTRAL,
                messages: [messages.err_post_short]
            });

        } else {

            sendInternalRequest(internalRequestData)
                .then(() => {
                    this.props.sendAlert({
                        alertType: alertTypes.SUCCESS,
                        messages: [messages.info_post_saved]
                    });

                }).catch(error => {
                this.props.sendAlert({
                    alertType: alertTypes.ERROR,
                    messages: (error.information === undefined)
                        ? [messages.err_server_error]
                        : [error.information]
                });
            })
        }

    }

    render() {
        return <QuillEditor sendContent={this.handleSubmit} isInternalRequest={true}/>;
    }
}