import React from "react";
import {deleteNewsPost, getAllNewsPosts} from "../../../util/APIUtils";
import {NewsItem} from "./NewsItem";
import {alertTypes} from "../../../util/Alert";
import {messages} from "../../../util/Messages";
import {ContentTable} from "../../../util/ContentTable";

export class NewsLister extends React.Component {
    constructor(props) {
        super(props);

        this.state = {newsPosts: []};

        this.deletePost = this.deletePost.bind(this);

    }

    componentDidMount() {
        this.getPosts();
    }

    getPosts() {
        getAllNewsPosts()
            .then(response => {
                this.setState({newsPosts: response})
            })
            .catch(error => {
                this.props.sendAlert({
                    alertType: alertTypes.ERROR,
                    messages: [error.information]
                });
            })
    }

    deletePost(id) {
        deleteNewsPost(id)
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

        let headers =
            <React.Fragment>
                <th className="w-40">Title</th>
                <th className="w-20">Date and time</th>
                <th className="w-10">Owner</th>
                <th className="w-10">Visibility</th>
                <th className="text-right">Actions</th>
            </React.Fragment>;

        return (
            <ContentTable headers={headers}>
                {this.state.newsPosts.map(
                    (newsPost, key) => {
                        return (
                            <NewsItem
                                key={key}
                                id={newsPost.id}
                                title={newsPost.title}
                                owner={newsPost.owner}
                                date={newsPost.date}
                                visible={(newsPost.visible)}
                                deletePost={this.deletePost}
                            />
                        )
                    })
                }
            </ContentTable>
        )
    }
}
