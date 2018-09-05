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

                if(error.status === 401) {
                    this.props.sendAlert({
                        alertType: alertTypes.ERROR,
                        messages: ["Seems like your session has expired. Please refresh the page!"]
                    })
                }

                this.props.sendAlert({
                    alertType: alertTypes.ERROR,
                    messages: [error.information]
                });
            })
    }

    deletePost(id) {
        deleteInternalRequest(id)
            .then(() => {
                this.props.sendAlert({
                    alertType: alertTypes.SUCCESS,
                    messages: ["The post has been deleted successfully!"]
                });
                this.getPosts();
            })
            .catch(error => {
                this.props.sendAlert({
                    alertType: alertTypes.ERROR,
                    messages: [error.information]
                });
            })
    }

    render() {

        return (
            <section>
                <div className="table-responsive-md">
                    <table className="table table-hover">
                        <thead className="main_color_dark">
                            <tr>
                                <th className="w-10">Status</th>
                                <th className="w-35">Title</th>
                                <th className="w-20">Date and time</th>
                                <th className="w-10">Owner</th>
                                <th className="w-10">Project</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
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
                                    deletePost={
                                        (this.props.currentUser.username === internalRequest.owner ||
                                        this.props.currentUser.roleType === "ROLE_OWNER")
                                        ? this.deletePost : null}
                                />
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </section>
        )

    }

}