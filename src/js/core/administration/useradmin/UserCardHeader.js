import React from "react";

export class UserCardHeader extends React.Component {

    constructor(props) {
        super(props);

        this.state = {arrowDown: true};

        this.rotateArrow = this.rotateArrow.bind(this);
    }

    setNameColor(role) {

        let nameColor = "text-dark";

        switch(role) {

            case "ROLE_OWNER":
                nameColor = "text-owner";
                break;

            case "ROLE_ADMIN":
                nameColor = "text-danger";
                break;

            case "ROLE_DEVELOPER":
                nameColor = "text-warning";
                break;

            case "ROLE_USER":
                nameColor = "text-primary";
                break;

            case "ROLE_NEW":
                nameColor = "text-info";
                break;

            case "ROLE_DISABLED":
                nameColor = "text-dark";
                break;
            default:
                break;
        }

        return nameColor;
    }

    rotateArrow() {

        this.setState({arrowDown: (!this.state.arrowDown)})
    }

    render() {

        let arrowClass = (this.state.arrowDown) ? "arrow_down" : "arrow_up";

        return (
            <div className={(this.props.editable) ? "card-header collapsed" : "card-header disabled"}
                 data-toggle={(this.props.editable) ? "collapse" : ""}
                 data-target={(this.props.editable) ? "#collapse" + this.props.index : ""}
                 onClick={this.rotateArrow}>
                <span className={"mb-0 " + this.setNameColor(this.props.role)}>{this.props.username}</span>
                {(this.props.activated) ? null : <span className="text-secondary ml-2 small"><i className="fa fa-power-off" aria-hidden="true"></i></span> }
                {(this.props.role === "ROLE_NEW") ? <span className="text-secondary ml-2 small"><i className="fa fa-plug" aria-hidden="true"></i></span> : null}
                <span className="float-right">
                    {(this.props.editable) ?
                        <i className={"fa fa-chevron-down " + this.setNameColor(this.props.role) + " " + arrowClass}
                           aria-hidden="true"/>
                        : null}
                </span>
            </div>
        )
    }
}