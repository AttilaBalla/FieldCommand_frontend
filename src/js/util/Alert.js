import React from "react";
import {ALERT_TIMEOUT} from "./Constants";

export const alertTypes = {
    NEUTRAL: {
        classElement: "alert-secondary",
    },
    SUCCESS: {
        classElement: "alert-success",
    },
    ERROR: {
        classElement: "alert-danger",
    }
};

export class Alert extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            active: true
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ active: false })
        }, ALERT_TIMEOUT);
    }

    componentWillReceiveProps() {

        this.setState({
            active: true
        });
        setTimeout(() => {
            this.setState({ active: false })
        }, ALERT_TIMEOUT);
    }

    setAlertType() {
        let classElement = "";

        switch (this.props.alertType) {
            case alertTypes.NEUTRAL:
                classElement = alertTypes.NEUTRAL.classElement;
                break;
            case alertTypes.SUCCESS:
                classElement = alertTypes.SUCCESS.classElement;
                break;
            case alertTypes.ERROR:
                classElement = alertTypes.ERROR.classElement;
                break;
            default:
                break;
        }

        return classElement;
    }

    render() {
        let classElement = this.setAlertType();

        if (this.state.active) {
            classElement += " show";
        }

        return (
            <div className={"alert popup-alert " + classElement} role="alert">
                {this.props.message}
            </div>
        )
    }
}