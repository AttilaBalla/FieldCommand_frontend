import React from "react";
import {alertTypes} from "../../../util/Alert";
import ReactTooltip from 'react-tooltip'
import {alterIntRequestSupport} from "../../../util/APIUtils";

export class IRSupportModule extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            percent: props.percent,
            supporters: props.supporters,
            isSupportingRequest: (this.props.supporters.includes(this.props.currentUser))
        };

        this.handleSupportChange = this.handleSupportChange.bind(this);
    }

    handleSupportChange() {
        alterIntRequestSupport({requestId: this.props.requestId, username: this.props.currentUser})
            .then((response) => {

                this.setState({
                    percent: parseInt(response.percent, 10),
                    isSupportingRequest: !this.state.isSupportingRequest,
                    supporters: response.supporters
                });

                this.props.sendAlert({
                    alertType: alertTypes.SUCCESS,
                    messages: (this.state.isSupportingRequest)
                        ? ["You are supporting this request!"]
                        : ["You are no longer supporting this request."]
                });

            }).catch(error => {
            this.props.sendAlert({
                alertType: alertTypes.ERROR,
                messages: [error.information]
            });
        });
    }

    render() {

        return(
            <React.Fragment>
                <h4>Support</h4>
                {(this.props.isRequestOwner)
                ?<span>You are the owner of this request, therefore you are supporting it.</span>
                : (this.state.isSupportingRequest)
                        ?<span>You are supporting this request.</span>
                        :<span>You can support this request if you think it's worth fulfilling.</span>
                }
                <div className="progress">
                    <div data-tip data-for="progressBar-tooltip" className="progress-bar progress-bar-striped bg-success"
                         role="progressbar" style={{width: this.state.percent + "%"}}
                         aria-valuenow={this.state.percent}
                         aria-valuemin="0"
                         aria-valuemax="100">{this.state.percent}%</div>
                </div>

                <ReactTooltip id="progressBar-tooltip" type="dark" effect="solid">
                    {this.state.supporters.map((supporter, key) => {
                        return(
                        <span key={key} className="mr-2">
                            {supporter}
                        </span>
                        )
                    })}
                </ReactTooltip>

                {(this.props.isRequestOwner)
                    ? null
                    : (this.state.isSupportingRequest)
                        ?<button type="button" className="btn btn-secondary" onClick={this.handleSupportChange}>
                            <i className="fa fa-ban mr-2" aria-hidden="true"></i>Revoke support
                        </button>
                        :<button type="button" className="btn btn-success" onClick={this.handleSupportChange}>
                            <i className="fa fa-thumbs-up mr-2" aria-hidden="true"></i>Support
                        </button>}

            </React.Fragment>
        )
    }

}