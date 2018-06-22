import React from "react";
import {NewsFeedPost} from "../../newsfeed/NewsfeedPost";
import {getSingleNewsPost} from "../../../util/APIUtils";
import {Alert, alertTypes} from "../../../util/Alert";
import {QuillEditor} from "../../../util/QuillEditor";

export class NewsEditor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hasNewsPost: false,
            id: "", // newspost data
            title: "",
            date: "",
            content: "",
            owner: "",
            visible: false,
        };

        this.setAlert = this.setAlert.bind(this);
    }

    componentDidMount() {
        const {match: {params}} = this.props;

        getSingleNewsPost(params.id)
            .then(response => {
                this.setState({
                    id: response.id,
                    title: response.title,
                    date: response.date,
                    content: response.content,
                    owner: response.owner,
                    visible: response.visible,
                    hasNewsPost: true})
            })
            .catch(error => {
                this.props.sendAlert({ // this will fail atm, no alert prop is given
                    alertType: alertTypes.ERROR,
                    message: error.information
                });
        })
    }

    setAlert(alert) {
        this.setState({
            alertType: alert.alertType,
            message: alert.message,
        })
    }

    render() {

        let editor;

        if(this.state.hasNewsPost) {
            editor = <QuillEditor
                editMode={true}
                newsPostId={this.state.id}
                title={this.state.title}
                content={this.state.content}
                visible={(this.state.visible === "True")}
                sendAlert={this.setAlert}

            />
        } else {
            editor = <p>loading editor...</p>
        }

        let alert = (this.state.alertType)
            ? <Alert alertType={this.state.alertType} message={this.state.message}/>
            : null;

        return(

            <div className="container-fluid">
                <div className="row core_container text_box">
                    {alert}
                    <div className="col-9 text_box">
                        <NewsFeedPost title={this.state.title}
                                      owner={this.state.owner}
                                      date={this.state.date}
                                      content={this.state.content}
                        />
                    </div>
                    {editor}
                </div>
            </div>
        )
    }
}