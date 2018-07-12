import React from "react";
import {getSingleInternalRequest, updateInternalRequest} from "../../util/APIUtils";
import {Alert, alertTypes} from "../../util/Alert";
import {UserContext} from "../../util/UserProvider";
import {QuillEditor} from "../../util/QuillEditor";
import {ProjectBadge} from "../../util/ProjectBadge";
import {IRSupportModule} from "./modules/IRSupportModule";
import {IRStatusModule} from "./modules/IRStatusModule";
import {Redirect} from "react-router-dom";

export class InternalRequestEditor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hasInternalRequest: false,
            id: "",
            title: "",
            date: "",
            content: "",
            owner: "",
            status: "",
            project: "",
        };

        this.setAlert = this.setAlert.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const {match: {params}} = this.props;

        getSingleInternalRequest(params.id)
            .then(response => {
                this.setState({
                    id: response.id,
                    title: response.title,
                    date: response.date,
                    content: response.content,
                    owner: response.owner,
                    status: response.status,
                    project: response.project,
                    supporters: response.supporters,
                    supportPercent: response.supportPercent,
                    hasInternalRequest: true})
            })
            .catch(error => {
                this.setState({
                    alertType: alertTypes.ERROR,
                    message: error.information
                });
            });
    }

    setAlert(alert) {
        this.setState({
            alertType: alert.alertType,
            message: alert.message,
        })
    }

    handleSubmit(internalRequest) {

        let internalRequestData = internalRequest;

        if(internalRequestData.title.length < 6 || internalRequestData.content.length < 20) {
            this.setState({
                alertType: alertTypes.NEUTRAL,
                message: "This post appears to be too short."
            });

        } else {

            internalRequestData["id"] = parseInt(this.state.id, 10);

            updateInternalRequest(internalRequestData)
                .then(() => {
                    this.setState({
                        alertType: alertTypes.SUCCESS,
                        message: "Your post has been updated successfully!"
                    });

                }).catch(error => {
                this.setState({
                    alertType: alertTypes.ERROR,
                    message: error.information
                });
            })
        }
    }

    handleSupportChange(username) {
        alterIntRequestSupport({requestId: this.state.requestId, username: username})
            .then(() => {
                this.setState({
                    alertType: alertTypes.SUCCESS,
                    message: "You are not supporting this request!"
                });

            }).catch(error => {
            this.setState({
                alertType: alertTypes.ERROR,
                message: error.information
            });
        });
    }

    render() {

        let editor;

        if(this.state.hasInternalRequest) {
            editor = <QuillEditor
                editMode={true}
                title={this.state.title}
                content={this.state.content}
                status={this.state.status}
                sendAlert={this.setAlert}
                sendContent={this.handleSubmit}

            />
        } else {
            editor = <p>loading editor...</p>
        }

        let alert = (this.state.alertType)
            ? <Alert alertType={this.state.alertType} message={this.state.message}/>
            : null;

        return(
            <UserContext.Consumer>
                {value => {
                    const {user} = value;

                    return(
                        <div className="container-fluid">
                            <div className="row core_container text_box">
                                {alert}
                                <span>Submitted by: {this.state.owner}</span>
                                <span className="float-right">Project: <ProjectBadge project={this.state.project} /></span>
                                <div className="intrequest_panel">
                                    <h4>{this.state.title}</h4>
                                    <div className="post_content" dangerouslySetInnerHTML={{__html: this.state.content}}/>
                                </div>
                                <div className="intrequest_panel">
                                    {(this.state.hasInternalRequest)
                                        ?<IRSupportModule
                                            percent={this.state.supportPercent}
                                            currentUser={user.username}
                                            supporters={this.state.supporters}
                                            alterRequest={this.handleSupportChange}
                                        />
                                        : null
                                    }
                                </div>
                                <div className="intrequest_panel">

                                    {(this.state.hasInternalRequest)
                                        ? <IRStatusModule
                                            requestId={this.state.id}
                                            canHandleRequest={(user.projects.includes(this.state.project))}
                                            status={this.state.status}
                                            sendAlert={this.setAlert}
                                        />
                                        : null
                                    }
                                </div>
                                <span>You are the owner of this request. You can edit it below.</span>
                                {editor}
                            </div>
                        </div>
                    )
                }}
            </UserContext.Consumer>
        )
    }
}