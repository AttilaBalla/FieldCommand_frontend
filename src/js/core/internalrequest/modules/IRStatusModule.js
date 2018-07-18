import React from 'react';
import {alterIntRequestStatus} from "../../../util/APIUtils";
import {alertTypes} from "../../../util/Alert";

export const statusButtons = {
    ARCHIVED:
        {
            name: "ARCHIVED",
            displayName: "Archived",
            textColor: "text-secondary",
            icon: "fa fa-archive",
            buttonClass: "btn btn-outline-dark"
        },
    DENIED:
        {
            name: "DENIED",
            displayName: "Denied",
            textColor: "text-danger",
            icon: "fa fa-ban",
            buttonClass: "btn btn-outline-danger"
        },
    WAITING:
        {
            name: "WAITING",
            displayName: "Waiting",
            textColor: "text-info",
            icon: "fa fa-clock-o",
            buttonClass: "btn btn-outline-info"
        },
    IN_PROGRESS:
        {
            name: "IN_PROGRESS",
            displayName: "In Progress",
            textColor: "text-warning",
            icon: "fa fa-hourglass-half",
            buttonClass: "btn btn-outline-warning"
        },
    APPROVED:
        {
            name: "APPROVED",
            displayName: "Approved",
            textColor: "text-success",
            icon: "fa fa-thumbs-up",
            buttonClass: "btn btn-outline-success"
        },
    DONE:
        {
            name: "DONE",
            displayName: "Done",
            textColor: "text-success",
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

        if(this.state.oldStatus === this.state.status && this.state.response === "") {
            this.props.sendAlert({
                alertType: alertTypes.NEUTRAL,
                message: "Please change the status or provide a response."
            });
        } else {

            alterIntRequestStatus(this.state)
                .then(() => {

                    this.props.sendAlert({
                        alertType: alertTypes.SUCCESS,
                        message: "The status of this request has been updated!"
                    });
                    this.setState({
                        oldStatus: this.state.status,
                    })

                })
                .catch(error => {
                    console.log(error.information);
                    this.props.sendAlert({
                        alertType: alertTypes.ERROR,
                        message: error.information
                    });
                });
        }
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

        return(

            <React.Fragment>
                <h4>Status</h4>
                {(this.props.canHandleRequest)
                    ? <span>You are an assigned admin for this project, you can handle this request by changing it's status.</span>
                    : null}
                <div className="btn-group btn-group-toggle mt-2 w-100" data-toggle="buttons" >
                    {buttonComponents}
                </div>

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
                            <button className="btn btn-warning ml-auto" onClick={this.handleSubmit}>Save Changes</button>
                        </div>
                    </React.Fragment>
                    : null}

            </React.Fragment>
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
