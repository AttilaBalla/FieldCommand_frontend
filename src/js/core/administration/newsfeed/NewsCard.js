import React from "react";

export class NewsCard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return(
            <div className="card">
                <div className="card-header" id="headingOne" data-toggle="collapse" data-target={"#" + this.props.id}>
                    <span>{this.props.title}</span>
                </div>
                <div id={this.props.id} className="collapse">
                    <div className="card-body" dangerouslySetInnerHTML={{__html: this.props.content}}></div>
                </div>
            </div>
        )
    }
}