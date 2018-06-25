import React from "react";
import 'react-tabs/style/react-tabs.css';
import {Alert} from "../../../util/Alert";
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {NewsEditor} from "../newsfeed/NewsEditor";


export class InternalRequest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            alertType: ""
        }

    }

    render() {

        let alert = (this.state.alertType)
            ? <Alert alertType={this.state.alertType} message={this.state.message}/>
            : null;

        return(
            <React.Fragment>
                {alert}
                <Tabs>
                    <TabList>
                        <Tab>Create a new request</Tab>
                        <Tab>List existing requests</Tab>
                    </TabList>
                    <TabPanel>
                        <NewsEditor sendAlert={this.setAlert}/>
                    </TabPanel>
                    <TabPanel>
                    </TabPanel>
                </Tabs>
            </React.Fragment>
        )
    }

}