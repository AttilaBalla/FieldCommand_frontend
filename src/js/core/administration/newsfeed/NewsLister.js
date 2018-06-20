import React from "react";
import {getNewsPosts} from "../../../util/APIUtils";
import {NewsCard} from "./NewsCard";

export class NewsLister extends React.Component {
    constructor(props) {
        super(props);

        this.state = {newsPosts: []}

    }

    componentDidMount() {
        getNewsPosts()
            .then(response => {
                this.setState({newsPosts: response})
            })
    }

    render() {
        return (
            <section className="useradmin_userlist">
                <div className="cards">
                    {this.state.newsPosts.map((newsPost, key) => {
                        console.log(newsPost);
                        return (
                            <NewsCard
                                key={key}
                                id={newsPost.id}
                                title={newsPost.title}
                                content={newsPost.content}
                                visible={(newsPost.visible === "True")}
                            />

                        )
                    })}
                </div>
            </section>
        )

    }

}