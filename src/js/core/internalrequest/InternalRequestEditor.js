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
                    {editor}
                </div>
            </div>
        )
    }
}