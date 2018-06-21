import React from "react";
import {getAllNewsPosts} from "../../../util/APIUtils";
import {NewsItem} from "./NewsItem";
import {alertTypes} from "../../../util/Alert";

export class NewsLister extends React.Component {
    constructor(props) {
        super(props);

        this.state = {newsPosts: []}

    }

    componentDidMount() {
        getAllNewsPosts()
            .then(response => {
                this.setState({newsPosts: response})
            })
            .catch(error => {
            this.props.sendAlert({
                alertType: alertTypes.ERROR,
                message: error.information
            });
        })
    }

    render() {
        return (
            <section>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item main_color_dark">
                        <div className="d-flex justify-content-between">
                            <span className="w-40">Title</span>
                            <span className="w-25">Date and time</span>
                            <span className="w-10">Owner</span>
                            <span className="w-10">Visibility</span>
                            <span className="ml-auto mr-3">Actions</span>
                        </div>
                    </li>
                    {this.state.newsPosts.map((newsPost, key) => {
                        return (
                            <NewsItem
                                key={key}
                                id={newsPost.id}
                                title={newsPost.title}
                                owner={newsPost.owner}
                                date={newsPost.date}
                                visible={(newsPost.visible === "True")}
                            />

                        )
                    })}
                </ul>
            </section>
        )

    }

}