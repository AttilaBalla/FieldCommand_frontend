import React from "react";
import {Link} from "react-router-dom";

export function NewsFeedSummary(props) {
    return(
        <div className="newsfeed_post">
            <Link className="newsfeed_link"
                  to={"/news/" + props.id}>
                <h2 className="post_title">{props.title}</h2>
            </Link>
            <p className="post_date">posted by {props.owner} on {props.date}</p>
            <div className="post_content mt-3 mb-2">
                {props.summary}
            </div>
        </div>
    )
}