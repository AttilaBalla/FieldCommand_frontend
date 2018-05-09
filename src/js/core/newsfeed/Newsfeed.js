import React from "react";
import {NewsFeedPost} from "./NewsfeedPost";

export class Newsfeed extends React.Component {

    render() {
        return (
            <div className="col-9 text_box">
                <NewsFeedPost/>
                <NewsFeedPost/>
            </div>
        )
    }
}