import React from 'react';

export class IRStatusModule extends React.Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return(
            <React.Fragment>
                <h4>Status</h4>
                <span>You are an assigned admin for this project, you can handle this request by changing it's status.</span>
                <div className="btn-group btn-group-toggle mt-2 w-100" data-toggle="buttons">
                    <label className="btn btn-secondary">
                        <input type="radio" name="status" value="archived" autoComplete="off"/>
                        <i className="fa fa-archive" aria-hidden="true"></i> Archived
                    </label>
                    <label className="btn btn-danger">
                        <input type="radio" name="status" value="denied" autoComplete="off"/>
                        <i className="fa fa-ban" aria-hidden="true"></i> Denied
                    </label>
                    <label className="btn btn-info active">
                        <input type="radio" name="status" value="waiting" autoComplete="off"/>
                        <i className="fa fa-clock-o" aria-hidden="true"></i> Waiting
                    </label>
                    <label className="btn btn-warning">
                        <input type="radio" name="status" value="in_progress" autoComplete="off"/>
                        <i className="fa fa-hourglass-half" aria-hidden="true"></i> In progress
                    </label>
                    <label className="btn btn-success">
                        <input type="radio" name="status" value="approved" autoComplete="off"/>
                        <i className="fa fa-thumbs-up" aria-hidden="true"></i> Approved
                    </label>
                    <label className="btn btn-success">
                        <input type="radio" name="status" value="done" autoComplete="off"/>
                        <i className="fa fa-check" aria-hidden="true"></i> Done
                    </label>
                </div>
            </React.Fragment>
        )
    }
}