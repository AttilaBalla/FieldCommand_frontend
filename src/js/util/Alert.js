//I put it here for now but most likely this will be common
import React from "react";

export const alertTypes = {
    NEUTRAL: {
        classElement: "alert alert-secondary",
    },
    SUCCESS: {
        classElement: "alert alert-success",
    },
    ERROR: {
        classElement: "alert alert-danger",
    }
};

export class Alert extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            active: true
        };

        this.disappear()

    }

    disappear() {
        setTimeout(() => {
            this.setState({
                active: false
            })
        }, 5000);
    }

    setAlertType() {
        let classElement = "";

        switch(this.props.alertType) {
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
        if(this.state.active) {

            return (
                <div className={this.setAlertType()} role="alert">
                    {this.props.text}
                </div>
            )
        } else {

            return ""
        }
}
}