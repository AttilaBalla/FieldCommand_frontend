import React from "react";
import {retrieveSwrStatus} from "./APIUtils.js";
import {ErrorTooltip} from "./ErrorTooltip";

export class Swrnet extends React.Component {
	content;
	
	constructor(props) {
		super(props);
		this.state = {
		    status: "LOADING"
        };
	}

	componentDidMount() {

        retrieveSwrStatus()
            .then((result) => {
      	        this.setState({
      	            result:result,
                    status: ""
      	        });
            })
            .catch(() => {
                this.setState({
                    status: "ERROR",
                });
            })
	}

	render() {

		if(this.state.status === "LOADING") {

           return (
                <React.Fragment>
                    <span className="content-status-navbar">
                        <i className="fa fa-spinner mr-2" aria-hidden="true"/>Loading...</span>
                </React.Fragment>
           )
        }

        if(this.state.status === "ERROR") {

            return (
                <React.Fragment>
                    <img className="mr-2" src="/img/swrnetlogo_off.png" width="80" height="20" alt=""/>
                    <ErrorTooltip error="swrNetError"/>
                </React.Fragment>
            )
        }

        return(
            <React.Fragment>
                <img className="mr-2" src="/img/swrnetlogo_on.png" width="80" height="20" alt=""/>
                {(this.state.result["count"] > 0)
                    ? <span className="text-success">{this.state.result["count"]}<i className="fa fa-user ml-1 mt-1" aria-hidden="true"></i></span>
                    : <span>{this.state.result["count"]}<i className="fa fa-user ml-1 mt-1" aria-hidden="true"></i></span>
                }
            </React.Fragment>
        )

	}
}
