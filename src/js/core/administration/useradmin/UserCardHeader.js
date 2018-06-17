import React from "react";

export class UserCardHeader extends React.Component {

    constructor(props) {
        super(props);

        this.state = {arrow: "arrow_down"};

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

        let newDirection;

        switch(this.state.arrow) {
            case "arrow_down":
                newDirection = "arrow_up";
                break;
            case "arrow_up":
                newDirection = "arrow_down";

                break;
            default:
                break;
        }

        this.setState({arrow: newDirection})
    }

    render() {
        return (
            <div className={(this.props.editable) ? "card-header collapsed" : "card-header disabled"}
                 data-toggle={(this.props.editable) ? "collapse" : ""}
                 data-target={(this.props.editable) ? "#collapse" + this.props.index : ""}
                 onClick={this.rotateArrow}>
                <span className={"mb-0 " + this.setNameColor(this.props.role)}>{this.props.username}</span>
                <span className="float-right">
                    {(this.props.editable) ?
                        <i className={"fa fa-chevron-down " + this.setNameColor(this.props.role) + " " + this.state.arrow}
                           aria-hidden="true"/>
                        : null}
                </span>
            </div>
        )
    }
}