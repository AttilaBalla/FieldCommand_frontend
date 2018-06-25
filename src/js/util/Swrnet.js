import React from "react";
import {retrieveSwrStatus} from "./APIUtils.js";
import {ErrorIndicator} from "./ErrorIndicator";

export class Swrnet extends React.Component {
	content;
	
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentWillMount() {

        retrieveSwrStatus()
      	.then(
        (result) => {
		  	this.setState(result);
        },
        (error) => {
          	this.setState({
            isLoaded: true,
            error
          	});
            console.log(error);
        });
	}

	render() {
		if(this.state["successful"]) {

			const count = this.state["count"] > 0 ? (
				<span className="text-success">{this.state["count"]}<i className="fa fa-user ml-1 mt-1" aria-hidden="true"></i></span>
			) : (
				<span>{this.state["count"]}<i className="fa fa-user ml-1 mt-1" aria-hidden="true"></i></span>
			);

			this.content =
			<div>
				<img className="mr-2" src="/img/swrnetlogo_on.png" width="80" height="20" alt=""/>
				{count}
			</div>;

		} else {
			// noinspection CheckTagEmptyBody
            this.content =
			<div>
				<img className="mr-2" src="/img/swrnetlogo_off.png" width="80" height="20" alt=""/>
                <ErrorIndicator error="swrNetError"/>
			</div>;
		}

		return (this.content);
	}
}
