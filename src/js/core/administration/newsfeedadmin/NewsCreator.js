import React from "react";
import {sendNewsPost} from "../../../util/APIUtils";
import {QuillEditor} from "../../../util/QuillEditor";
import {alertTypes} from "../../../util/Alert";
import {messages} from "../../../util/messages";

export class NewsCreator extends React.Component {

    constructor(props) {
        super(props);

        this.state = {pendingRequest: false};

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateNewsPost(newsPost) {

        let errors = [];

        if(newsPost.title === "" || newsPost.summary === "" || newsPost.content === "") {
            errors.push(messages.err_field_required);
        }

        if(newsPost.title.length < 6 || newsPost.summary.length < 6 || newsPost.content.length < 20) {
            errors.push(messages.err_post_short);
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
                        messages: [messages.info_post_saved]
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