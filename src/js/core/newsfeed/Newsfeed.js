import React from "react";
import {NewsFeedPost} from "./NewsfeedPost";
import {getAllNewsPosts} from "../../util/APIUtils";

export class Newsfeed extends React.Component {

    constructor(props) {
        super(props);

        this.state = {newsPosts: []};
    }

    componentDidMount() {
        getAllNewsPosts()
            .then(response => {
                this.setState({newsPosts: response})
            })
            .catch(error => {
                console.log(error);
                //TODO ERROR HANDLING
            })
    }

    render() {
        return (
            <div className="col-9 text_box">
            {this.state.newsPosts.map((newsPost, key) => {

                return (
                    (newsPost.visible === "True") ?
                    <NewsFeedPost
                        key={key}
                        title={newsPost.title}
                        owner={newsPost.owner}
                        date={newsPost.date}
                        content={newsPost.content}
                    /> : null
                )
            })}
            <NewsFeedPost/>
            <NewsFeedPost/>
            </div>
        )
    }
}