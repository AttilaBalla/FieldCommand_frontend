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


    handleSubmit(newsPost) {

        let newsPostData = newsPost;

        if(newsPostData.title.length < 6 || newsPostData.content.length < 20) {
            this.props.sendAlert({
                alertType: alertTypes.NEUTRAL,
                message: "This post appears to be too short."
            });

        } else {

            this.setState({pendingRequest: true});

            sendNewsPost(newsPostData)
                .then(() => {
                    this.props.sendAlert({
                        alertType: alertTypes.SUCCESS,
                        message: "Your post has been saved successfully!"
                    });
                    this.setState({pendingRequest: false})

                }).catch(error => {
                    this.props.sendAlert({
                        alertType: alertTypes.ERROR,
                        message: error.information
                    });
                    this.setState({pendingRequest: false})
                }
            )
        }
    }

    render() {

        return(
            <QuillEditor sendContent={this.handleSubmit} toggleVisibility={true} submitDisabled={(this.state.pendingRequest)}/>
        )
    }
}