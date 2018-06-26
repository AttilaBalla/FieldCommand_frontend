import React from "react";
import {sendNewsPost} from "../../../util/APIUtils";
import {QuillEditor} from "../../../util/QuillEditor";
import {alertTypes} from "../../../util/Alert";

export class NewsCreator extends React.Component {

    constructor(props) {
        super(props);

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

            sendNewsPost(newsPostData)
                .then(() => {
                    this.props.sendAlert({
                        alertType: alertTypes.SUCCESS,
                        message: "Your post has been saved successfully!"
                    });
                    this.setState({title: "", content: ""})

                }).catch(error => {
                this.props.sendAlert({
                    alertType: alertTypes.ERROR,
                    message: error.information
                });
            })
        }
    }

    render() {
        return(
            <QuillEditor sendNewsPost={this.handleSubmit} toggleVisibility={true}/>
        )
    }
}