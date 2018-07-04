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
                message: "This post appears to be too short."
            });

        } else {

            sendInternalRequest(internalRequestData)
                .then(() => {
                    this.props.sendAlert({
                        alertType: alertTypes.SUCCESS,
                        message: "Your post has been saved successfully!"
                    });
                    this.setState({title: "", message: ""})

                }).catch(error => {
                this.props.sendAlert({
                    alertType: alertTypes.ERROR,
                    message: error.information
                });
            })
        }

    }

    render() {
        return <QuillEditor sendContent={this.handleSubmit} toggleProjectSelect={true}/>;
    }
}