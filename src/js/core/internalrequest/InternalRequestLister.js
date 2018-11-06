import React from "react";
import {deleteInternalRequest, getInternalRequests} from "../../util/APIUtils";
import {alertTypes} from "../../util/Alert";
import {InternalRequestItem} from "./InternalRequestItem";
import {messages} from "../../util/Messages";
import {ContentTable} from "../../util/ContentTable";

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
                        messages: [messages.err_session_expired]
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
                    messages: [messages.info_post_deleted]
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

        let contentTableHeaders =
            <React.Fragment>
                <th className="w-10">Status</th>
                <th className="w-35">Title</th>
                <th className="w-20">Date and time</th>
                <th className="w-10">Owner</th>
                <th className="w-10">Project</th>
                <th className="text-right">Actions</th>
            </React.Fragment>;

        return (
            <ContentTable headers={contentTableHeaders}>
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
            </ContentTable>
        )
    }
}