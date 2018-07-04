import React from "react";
import {deleteInternalRequest, getInternalRequests} from "../../util/APIUtils";
import {alertTypes} from "../../util/Alert";
import {InternalRequestItem} from "./InternalRequestItem";

export class InternalRequestLister extends React.Component {
    constructor(props) {
        super(props);

        this.state = {internalRequests: []};

        this.deletePost = this.deletePost.bind(this);

    }

    componentDidMount() {
        this.getPosts();
    }

    getPosts() {
        getInternalRequests()
            .then(response => {
                this.setState({internalRequests: response})
            })
            .catch(error => {
                this.props.sendAlert({
                    alertType: alertTypes.ERROR,
                    message: error.information
                });
            })
    }

    deletePost(id) {
        deleteInternalRequest(id)
            .then(() => {
                this.props.sendAlert({
                    alertType: alertTypes.SUCCESS,
                    message: "The post has been deleted successfully!"
                });
                this.getPosts();
            })
            .catch(error => {
                this.props.sendAlert({
                    alertType: alertTypes.ERROR,
                    message: error.information
                });
            })
    }

    render() {
        return (
            <section>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item main_color_dark">
                        <div className="d-flex justify-content-between">
                            <span className="w-10">Status</span>
                            <span className="w-40">Title</span>
                            <span className="w-20">Date and time</span>
                            <span className="w-10">Owner</span>
                            <span className="w-10">Project</span>
                            <span className="ml-auto"></span>
                        </div>
                    </li>
                    {this.state.internalRequests.map((internalRequest, key) => {
                        return (
                            <InternalRequestItem
                                key={key}
                                id={internalRequest.id}
                                title={internalRequest.title}
                                owner={internalRequest.owner}
                                date={internalRequest.date}
                                status={internalRequest.status}
                                project={internalRequest.project}
                                deletePost={this.deletePost}
                            />

                        )
                    })}
                </ul>
            </section>
        )

    }

}