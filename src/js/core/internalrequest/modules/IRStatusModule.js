import React from 'react';
import {alterIntRequestStatus} from "../../../util/APIUtils";
import {alertTypes} from "../../../util/Alert";

export const statusButtons = {
    ARCHIVED:
        {
            name: "ARCHIVED",
            displayName: "Archived",
            textColor: "secondary",
            icon: "fa fa-archive",
            buttonClass: "btn btn-outline-dark"
        },
    DENIED:
        {
            name: "DENIED",
            displayName: "Denied",
            textColor: "danger",
            icon: "fa fa-ban",
            buttonClass: "btn btn-outline-danger"
        },
    WAITING:
        {
            name: "WAITING",
            displayName: "Waiting",
            textColor: "info",
            icon: "fa fa-clock-o",
            buttonClass: "btn btn-outline-info"
        },
    IN_PROGRESS:
        {
            name: "IN_PROGRESS",
            displayName: "In Progress",
            textColor: "warning",
            icon: "fa fa-hourglass-half",
            buttonClass: "btn btn-outline-warning"
        },
    APPROVED:
        {
            name: "APPROVED",
            displayName: "Approved",
            textColor: "success",
            icon: "fa fa-thumbs-up",
            buttonClass: "btn btn-outline-success"
        },
    DONE:
        {
            name: "DONE",
            displayName: "Done",
            textColor: "success",
            icon: "fa fa-check",
            buttonClass: "btn btn-outline-success"
        }
};

export class IRStatusModule extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            requestId: props.requestId,
            oldStatus: props.status,
            oldResponse: props.response,
            status: props.status,
            response: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleStatusChange(status) {
        this.setState({status: status})
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit() {

        alterIntRequestStatus(this.state)
            .then(() => {

                this.props.sendAlert({
                    alertType: alertTypes.SUCCESS,
                    messages: ["The status of this request has been updated!"]
                });

                //avoid overwriting the response with "" if it's not updated next time
                if(this.state.response) {
                    this.setState({
                        oldResponse: this.state.response,
                        oldStatus: this.state.status
                    })
                } else {
                    this.setState({
                        oldStatus: this.state.status,
                    })
                }
            })
            .catch(error => {
                this.props.sendAlert({
                    alertType: alertTypes.ERROR,
                    messages: [error.information]
                });
            });
    }

    render() {
        let buttonList = Object.keys(statusButtons).map(i => statusButtons[i]);
        let buttonComponents = buttonList.map((button, key) => {

            return(
                <StatusButton
                    active={(button.name === this.state.status)}
                    key={key}
                    name={button.name}
                    displayName={button.displayName}
                    icon={button.icon}
                    buttonClass={button.buttonClass}
                    setActive={this.handleStatusChange}
                    disabled={!this.props.canHandleRequest}
                />
            )
        });

        let contentChanged = false;
        // HL module if response is not empty AND does not equal the old response OR status changed
        if((this.state.response !== "" && this.state.response !== this.state.oldResponse)
            || this.state.oldStatus !== this.state.status) {
            contentChanged = true;
        }

        return(

            <div className={(contentChanged) ? "intrequest_panel outlined" : "intrequest_panel"}>
                <h4>Status</h4>
                {(this.props.canHandleRequest)
                    ? <span>You are an assigned admin for this project, you can handle this request by changing it's status.</span>
                    : null}
                <div className="btn-group btn-group-toggle mt-2 w-100" data-toggle="buttons" >
                    {buttonComponents}
                </div>

                {(this.props.handledBy) ? <small className=" mt-2 d-flex">Last handled by: {this.props.handledBy}</small> : null}

                {(this.props.response)
                    ?
                    <div className={"mt-2 alert alert-" + statusButtons[this.state.oldStatus].textColor} role="alert">
                        <i className=" mr-2 fa fa-commenting" aria-hidden="true"></i>{this.state.oldResponse}
                    </div>
                    : null}

                {(this.props.canHandleRequest)
                    ?
                    <React.Fragment>
                        <label className="mt-4" htmlFor="response">Response:</label>
                        <div className="form_block">
                            <input type="text"
                                   id="response"
                                   name="response"
                                   className="form-control w-75"
                                   placeholder="You can provide a short response to this request (optional)"
                                   onChange={this.handleChange}
                            />
                            <button className={(contentChanged) ? "btn btn-primary ml-auto" : "btn btn-secondary ml-auto disabled"}
                                    onClick={(contentChanged) ? this.handleSubmit : null}>
                                <i className="fa fa-floppy-o mr-2" aria-hidden="true"></i>
                                Save Changes
                            </button>
                        </div>
                    </React.Fragment>
                    : null}
            </div>
        )
    }
}

class StatusButton extends React.Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.setActive(this.props.name);
    }

    render() {

        let buttonClass = this.props.buttonClass;

        if(this.props.active) {
            buttonClass += " active";
        } else if(this.props.disabled) {
            buttonClass += " disabled";
        }

        return (
            <button className={buttonClass}
                    onClick={(this.props.disabled) ? null : this.handleClick}>
                <i className={this.props.icon + " mr-2"}></i>{this.props.displayName}
            </button>
        )
    }
}
