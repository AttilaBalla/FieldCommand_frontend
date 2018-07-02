import React from "react";
import {getSingleInternalRequest, updateInternalRequest} from "../../util/APIUtils";
import {Alert, alertTypes} from "../../util/Alert";
import {QuillEditor} from "../../util/QuillEditor";

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
            visible: false,
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
                    hasInternalRequest: true})
            })
            .catch(error => {
                this.setState({
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

    render() {

        let editor;

        if(this.state.hasInternalRequest) {
            editor = <QuillEditor
                editMode={true}
                title={this.state.title}
                content={this.state.content}
                status={this.state.status}
                sendAlert={this.setAlert}
                sendNewsPost={this.handleSubmit}

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
                    <span>Submitted by: {this.state.owner}</span>
                    <div className="intrequest_panel">
                        <h4>{this.state.title}</h4>
                        <div className="post_content" dangerouslySetInnerHTML={{__html: this.state.content}}/>
                    </div>
                    <div className="intrequest_panel">
                        <h4>Support</h4>
                        <span>You can support this request if you think it's worth fulfilling.</span>
                        <div className="progress">
                            <div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={{width: "70%"}}
                                 aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">70%</div>
                        </div>
                        <button type="button" className="btn btn-success">
                            <i className="fa fa-thumbs-up" aria-hidden="true"></i>Support
                        </button>
                    </div>
                    <div className="intrequest_panel">
                        <h4>Status</h4>
                        <span>You are an assigned admin for this project, you can handle this request by changing it's status.</span>
                        <div className="btn-group btn-group-toggle mt-2 w-100" data-toggle="buttons">
                            <label className="btn btn-secondary">
                                <input type="radio" name="status" value="archived" autoComplete="off"/>
                                <i className="fa fa-archive" aria-hidden="true"></i> Archived
                            </label>
                            <label className="btn btn-danger">
                                <input type="radio" name="status" value="denied" autoComplete="off"/>
                                <i className="fa fa-ban" aria-hidden="true"></i> Denied
                            </label>
                            <label className="btn btn-info active">
                                <input type="radio" name="status" value="waiting" autoComplete="off"/>
                                <i className="fa fa-clock-o" aria-hidden="true"></i> Waiting
                            </label>
                            <label className="btn btn-warning">
                                <input type="radio" name="status" value="in_progress" autoComplete="off"/>
                                <i className="fa fa-hourglass-half" aria-hidden="true"></i> In progress
                            </label>
                            <label className="btn btn-success">
                                <input type="radio" name="status" value="approved" autoComplete="off"/>
                                <i className="fa fa-thumbs-up" aria-hidden="true"></i> Approved
                            </label>
                            <label className="btn btn-success">
                                <input type="radio" name="status" value="done" autoComplete="off"/>
                                <i className="fa fa-check" aria-hidden="true"></i> Done
                            </label>
                        </div>
                    </div>
                    <span>You are the owner of this request. You can edit it below.</span>
                    {editor}
                </div>
            </div>
        )
    }
}