import React from "react";
import {NewsFeedPost} from "../../newsfeed/NewsfeedPost";
import {getSingleNewsPost} from "../../../util/APIUtils";
import {alertTypes} from "../../../util/Alert";
import {QuillEditor} from "../../../util/QuillEditor";

export class NewsEditor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            newsPost: {}
        }
    }

    componentDidMount() {
        const {match: {params}} = this.props;

        getSingleNewsPost(params.id)
            .then(response => {
                this.setState({newsPost: response})
            })
            .catch(error => {
                this.props.sendAlert({ // this will fail atm, no alert prop is given
                    alertType: alertTypes.ERROR,
                    message: error.information
                });
        })
    }

    render() {
        return(
            <div className="container-fluid">
                <div className="row core_container text_box">
                    <div className="col-9 text_box">
                        <NewsFeedPost title={this.state.newsPost.title}
                                      owner={this.state.newsPost.owner}
                                      date={this.state.newsPost.date}
                                      content={this.state.newsPost.content}
                        />
                    </div>
                    <QuillEditor
                        editMode={true}
                        title={this.state.newsPost.title}
                        content={this.state.newsPost.content}
                        visiblity={this.state.newsPost.visible}

                    /> {/* needs Alert prop!*/}
                </div>
            </div>
        )
    }
}