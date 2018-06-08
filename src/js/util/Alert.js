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

const alertTimeout = 4000;

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
        }, alertTimeout);
    }

    componentWillReceiveProps() {

        this.setState({
            active: true
        });
        setTimeout(() => {
            this.setState({ active: false })
        }, alertTimeout);
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
            <div className={classElement} role="alert">
                {this.props.message}
            </div>
        )
    }
}