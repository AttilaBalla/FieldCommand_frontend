import React from "react";

export class NewsItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return(
            <li className="list-group-item">
                <div className="d-flex justify-content-between">
                    <span className="w-40">{this.props.title}</span>
                    <span className="w-25">{this.props.date}</span>
                    <span className="w-10">{this.props.owner}</span>
                    <span className="w-10">{
                        (this.props.visible)
                            ? <i className="fa fa-eye mr-1 text-success" aria-hidden="true"></i>
                            : <i className="fa fa-eye-slash mr-1" aria-hidden="true"></i>
                    }
                    </span>
                    <span className="ml-auto">
                        <button className="btn btn-warning mr-1" /*onClick={}*/>
                            <i className="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                        <button className="btn btn-danger" /*onClick={}*/>
                            <i className="fa fa-trash" aria-hidden="true"></i>
                        </button>
                    </span>
                </div>
            </li>
        )
    }
}