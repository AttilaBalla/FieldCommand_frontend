import React from "react";
import {sendNewsPost} from "../../../util/APIUtils";
import {QuillEditor} from "../../../util/QuillEditor";
import {alertTypes} from "../../../util/Alert";

export class NewsCreator extends React.Component {

    constructor(props) {
        super(props);

        this.state = {pendingRequest: false};

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateNewsPost(newsPost) {

        let errors = [];

        if(newsPost.title === "" || newsPost.summary === "" || newsPost.content === "") {
            errors.push("All fields are required!");
        }

        if(newsPost.title.length < 6 || newsPost.summary.length < 6 || newsPost.content.length < 20) {
            errors.push("This post appears to be too short!");
        }

        return errors;
    }


    handleSubmit(newsPost) {

        let validationResult = this.validateNewsPost(newsPost);

        if(validationResult.length === 0) {

            this.setState({pendingRequest: true});

            sendNewsPost(newsPost)
                .then(() => {
                    this.props.sendAlert({
                        alertType: alertTypes.SUCCESS,
                        messages: ["Your post has been saved successfully!"]
                    });
                    this.setState({pendingRequest: false})

                }).catch(error => {
                    this.props.sendAlert({
                        alertType: alertTypes.ERROR,
                        messages: [error.information]
                    });
                    this.setState({pendingRequest: false})
                }
            )
        } else {

            this.props.sendAlert({
                alertType: alertTypes.NEUTRAL,
                messages: validationResult
            });
        }
    }

    render() {

        return(
            <QuillEditor sendContent={this.handleSubmit} isNewspost={true} submitDisabled={(this.state.pendingRequest)}/>
        )
    }
}