import React from "react";
import {Redirect} from "react-router-dom";
import {getSingleNewsPost, updateNewsPost} from "../../../util/APIUtils";
import {Alert, alertTypes} from "../../../util/Alert";
import {QuillEditor} from "../../../util/QuillEditor";
import {NewsFeedPost} from "../../newsfeed/NewsfeedPost";

export class NewsEditor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hasNewsPost: false,
            id: "", // newspost data
            title: "",
            date: "",
            summary: "",
            content: "",
            owner: "",
            visible: false,
        };

        this.setAlert = this.setAlert.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const {match: {params}} = this.props;

        getSingleNewsPost(params.id)
            .then(response => {

                this.setState({
                    id: response.id,
                    title: response.title,
                    date: response.date,
                    summary: response.summary,
                    content: response.content,
                    owner: response.owner,
                    visible: response.visible,
                    hasNewsPost: true})
            })
            .catch(error => {
                this.setState({
                    redirect: true,
                    alertType: alertTypes.ERROR,
                    messages: [error.information]
                });
        })
    }

    setAlert(alert) {
        this.setState({
            alertType: alert.alertType,
            messages: [alert.messages],
        })
    }

    handleSubmit(newsPost) {

        let newsPostData = newsPost;

        if(newsPostData.title.length < 6 || newsPostData.content.length < 20) {
            this.setState({
                alertType: alertTypes.NEUTRAL,
                message: "This post appears to be too short."
            });

        } else {

            newsPostData["id"] = parseInt(this.state.id, 10);

            updateNewsPost(newsPostData)
                .then(() => {
                    this.setState({
                        alertType: alertTypes.SUCCESS,
                        messages: ["Your post has been updated successfully!"]
                    });

                }).catch(error => {
                this.setState({
                    alertType: alertTypes.ERROR,
                    message: [error.information]
                });
            })
        }
    }

    render() {

        if(this.state.redirect) {
            return(
                <Redirect to="/"/>
            )
        }

        let editor;

        if(this.state.hasNewsPost) {
            editor = <QuillEditor
                editMode={true}
                title={this.state.title}
                summary={this.state.summary}
                content={this.state.content}
                visible={(this.state.visible)}
                sendAlert={this.setAlert}
                sendContent={this.handleSubmit}
                isNewspost={true}

            />
        } else {
            editor = <p>loading editor...</p>
        }

        let alert = (this.state.alertType)
            ? <Alert alertType={this.state.alertType} messages={this.state.messages}/>
            : null;

        return(
            <div className="container-fluid">
                    {alert}
                    <div className="col-9 text_box">
                        <NewsFeedPost title={this.state.title}
                                      owner={this.state.owner}
                                      summary={this.state.summary}
                                      date={this.state.date}
                                      content={this.state.content}
                        />
                    </div>
                    {editor}
                </div>
        )
    }
}