import React from "react";
import {QuillEditor} from "../../util/QuillEditor";
import {alertTypes} from "../../util/Alert";
import {sendInternalRequest} from "../../util/APIUtils";

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
                messages: ["This post appears to be too short."]
            });

        } else {

            sendInternalRequest(internalRequestData)
                .then(() => {
                    this.props.sendAlert({
                        alertType: alertTypes.SUCCESS,
                        messages: ["Your post has been saved successfully!"]
                    });

                }).catch(error => {
                this.props.sendAlert({
                    alertType: alertTypes.ERROR,
                    messages: (error.information === undefined)
                        ? ["A server error occured, please notify the owner!"]
                        : [error.information]
                });
            })
        }

    }

    render() {
        return <QuillEditor sendContent={this.handleSubmit} isInternalRequest={true}/>;
    }
}