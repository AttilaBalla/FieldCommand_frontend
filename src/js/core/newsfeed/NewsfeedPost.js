import React from "react";

export function NewsFeedPost(props) {
    return(
        <div className="newsfeed_post">
            <h2 className="post_title">{props.title}</h2>
            <p className="post_date">posted by {props.owner} on {props.date}</p>
            <div className="post_content" dangerouslySetInnerHTML={{__html: props.content}}/>
        </div>
    )
}

NewsFeedPost.defaultProps = {
    title: "A news post title",
    owner: "XAttus",
    date: "23-3-2018",
    content: "this is a long text here about stuff. this is a long text here about stuff. " +
    "this is a long text here about stuff. this is a long text here about stuff. " +
    "this is a long text here about stuff. this is a long text here about stuff. " +
    "this is a long text here about stuff."
};