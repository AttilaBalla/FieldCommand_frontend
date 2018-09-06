import React from "react";
import {getSingleNewsPost} from "../../util/APIUtils";
import {NewsFeedPost} from "../newsfeed/NewsfeedPost";

export class NewsPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hasNewsPost: null,
            id: "", // newspost data
            title: "",
            date: "",
            summary: "",
            content: "",
            owner: "",
            visible: false,
        };
    }

    componentDidMount() {
        const {match: {params}} = this.props;

        getSingleNewsPost(params.id)
            .then(response => {

                this.setState({
                    id: response.id,
                    title: response.title,
                    date: response.date,
                    summary: response.summary,
                    content: response.content,
                    owner: response.owner,
                    visible: response.visible,
                    hasNewsPost: true})
            })
            .catch(error => {
                //TODO DIS PROPERLY
                console.log(error);

                this.setState({
                    hasNewsPost: false
                })
            })
    }

    render() {

        let componentBody;

        if(this.state.hasNewsPost === null) {
            componentBody =
                <span>
                    <h4 className="content-status">
                        <i className="fa fa-spinner mr-2" aria-hidden="true"></i>loading posts...
                    </h4>
                </span>

        } else {

            if (this.state.hasNewsPost) {
                componentBody =
                    <NewsFeedPost
                        title={this.state.title}
                        owner={this.state.owner}
                        content={this.state.content}
                        date={this.state.date}
                    />
            }

            if (!this.state.hasNewsPost) {
                componentBody =
                    <span>
                        <h4 className="content-status text-danger">
                            <i className="fa fa-exclamation-triangle mr-2" aria-hidden="true"></i>Could not load content. This might be a connection or server issue.
                        </h4>
                    </span>
            }
        }

        return(
            <div className="row core_container text_box">
                {componentBody}
            </div>

        )
    }
}