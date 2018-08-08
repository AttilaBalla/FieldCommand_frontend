import React from "react";
import Link from "react-router-dom/es/Link";
import {ProjectBadge} from "../../util/ProjectBadge";
import {statusButtons} from "./modules/IRStatusModule";

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

        let cancelDeleteButton =
        <React.Fragment>
            <span className="small mr-1">Are you sure?</span>
            <button className="btn btn-secondary btn-sm mr-1" onClick={this.cancelDelete}>
                <i className="fa fa-ban" aria-hidden="true"></i>
            </button>
        </React.Fragment>;

        let deleteButton = (this.props.deletePost) ?
            <td className="text-right">
                    {(this.state.confirmedDelete)
                        ? cancelDeleteButton
                        : null
                    }
                <button className="btn btn-danger btn-sm"  onClick={this.sendDelete}>
                        {(this.state.confirmedDelete)
                            ? <i className="fa fa-check" aria-hidden="true"></i>
                            : <i className="fa fa-trash" aria-hidden="true"></i>
                        }
                </button>
            </td> : null;

         let statusData = statusButtons[this.props.status];

        return(
                <tr className="bg-white">
                    <td className={"align-middle text-" + statusData.textColor + " w-10 small"}>
                        <i className={statusData.icon + " mr-2"}></i>{statusData.displayName}
                    </td>
                    <td className="align-middle w-35 no-overflow">
                        <Link to={"requests/" + this.props.id}>{this.props.title}</Link>
                    </td>
                    <td className="align-middle w-20">{this.props.date}</td>
                    <td className="align-middle w-10">{this.props.owner}</td>
                    <td><ProjectBadge project={this.props.project} id={this.props.id}/></td>
                    {deleteButton}
                </tr>
        )
    }
}