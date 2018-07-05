import React from "react";

export class IRSupportModule extends React.Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return(
            <React.Fragment>
                <h4>Support</h4>
                <span>You can support this request if you think it's worth fulfilling.</span>
                <div className="progress">
                    <div className="progress-bar progress-bar-striped bg-success"
                         role="progressbar" style={{width: this.props.percent + "%"}}
                         aria-valuenow={this.props.percent}
                         aria-valuemin="0"
                         aria-valuemax="100">{this.props.percent}%</div>
                </div>
                <button type="button" className="btn btn-success">
                    <i className="fa fa-thumbs-up" aria-hidden="true"></i>Support
                </button>
            </React.Fragment>
        )
    }

}