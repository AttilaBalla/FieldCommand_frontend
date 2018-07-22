import React from "react";
import {NewsFeedPost} from "./NewsfeedPost";
import {getAllNewsPosts} from "../../util/APIUtils";

export class Newsfeed extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            newsPosts: [],
            status: "LOADING"
        };
    }

    componentDidMount() {
        getAllNewsPosts()
            .then(response => {
                this.setState({
                    newsPosts: response,
                    status: ""
                })
            })
            .catch(error => {
                console.log(error);
                //TODO ERROR HANDLING
                this.setState({status: "ERROR"})
            })
    }

    render() {

        if(this.state.status === "LOADING") {
            return(
                <span>
                    <h4 className="content-status">
                        <i className="fa fa-spinner mr-2" aria-hidden="true"></i>loading posts...
                    </h4>
                </span>
            )
        }

        if(this.state.status === "ERROR") {
            return(
                <span>
                    <h4 className="content-status text-danger">
                        <i className="fa fa-exclamation-triangle mr-2" aria-hidden="true"></i>Could not load content. This might be a connection or server issue.
                    </h4>
                </span>
            )
        }

        if(this.state.newsPosts.filter(newsPost => (newsPost.visible)).length < 1) {
            return(
                <span>
                    <h6 className="content-status">
                        There are no posts to show :(<br/>
                        Maybe next time there will be something here...
                    </h6>
                </span>
            )
        }

        return (
            <React.Fragment>
                {this.state.newsPosts.map((newsPost, key) => {

                    return (
                        (newsPost.visible) ?
                        <NewsFeedPost
                            key={key}
                            title={newsPost.title}
                            owner={newsPost.owner}
                            date={newsPost.date}
                            content={newsPost.content}
                        /> : null
                    )
                })}
            </React.Fragment>
        )
    }
}