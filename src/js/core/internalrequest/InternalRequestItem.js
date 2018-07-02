import React from "react";
import Link from "react-router-dom/es/Link";

export class InternalRequestItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            confirmedDelete: false
        };

        this.sendDelete = this.sendDelete.bind(this);
        this.cancelDelete = this.cancelDelete.bind(this);

    }

    sendDelete() {
        if(this.state.confirmedDelete) {
            this.setState({confirmedDelete: false});
            this.props.deletePost(this.props.id);
        } else {
            this.setState({confirmedDelete: true})
        }
    }

    cancelDelete() {
        this.setState({confirmedDelete: false})
    }


    render() {

        let cancelDeleteButton = <React.Fragment>
            <span className="small mr-1">Are you sure?</span>
            <button className="btn btn-secondary mr-1" onClick={this.cancelDelete}>
                <i className="fa fa-ban" aria-hidden="true"></i>
            </button>
        </React.Fragment>;

        let editButton = <Link to={"ir-editor/" + this.props.id}>
            <button className="btn btn-warning mr-1">
                <i className="fa fa-pencil" aria-hidden="true"></i>
            </button>
        </Link>;


        return(
            <li className="list-group-item">
                <div className="d-flex justify-content-between">
                    <span className="w-40">{this.props.title}</span>
                    <span className="w-20">{this.props.date}</span>
                    <span className="w-10">{this.props.owner}</span>
                    <span className="w-10">{this.props.status}</span>
                    <span className="ml-auto">
                        {(this.state.confirmedDelete)
                            ? cancelDeleteButton
                            : editButton
                        }
                        <button className="btn btn-danger"  onClick={this.sendDelete}>
                            {(this.state.confirmedDelete)
                                ? <i className="fa fa-check" aria-hidden="true"></i>
                                : <i className="fa fa-trash" aria-hidden="true"></i>
                            }

                        </button>
                    </span>
                </div>
            </li>
        )
    }
}