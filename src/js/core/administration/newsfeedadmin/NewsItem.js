import React from "react";
import {Link} from 'react-router-dom';

export class NewsItem extends React.Component {

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

        let editButton = <Link to={"newseditor/" + this.props.id}>
                            <button className="btn btn-info mr-1">
                                <i className="fa fa-pencil" aria-hidden="true"></i>
                            </button>
                        </Link>;

        return(
            <tr className="bg-white">
                <td className="w-40 no-overflow">{this.props.title}</td>
                <td className="w-20">{this.props.date}</td>
                <td className="w-10">{this.props.owner}</td>
                <td className="w-10 text-center">{
                    (this.props.visible)
                        ? <i className="fa fa-eye mr-1 text-primary" aria-hidden="true"></i>
                        : <i className="fa fa-eye-slash mr-1" aria-hidden="true"></i>
                }
                </td>
                <td className="text-right">
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
                </td>
            </tr>
        )
    }
}