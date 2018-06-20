import React from "react";
import {NewsEditor} from "./NewsEditor";
import {Alert} from "../../../util/Alert";
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {NewsLister} from "./NewsLister";


export class NewsFeed extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            alertType: ""
        };

        this.setAlert = this.setAlert.bind(this);
    }

    setAlert(alert) {
        this.setState({
            alertType: alert.alertType,
            message: alert.message,
        })
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
                        <Tab>Create a new entry</Tab>
                        <Tab>List existing entries</Tab>
                    </TabList>
                    <TabPanel>
                        <NewsEditor sendAlert={this.setAlert}/>
                    </TabPanel>
                    <TabPanel>
                        <NewsLister/>
                    </TabPanel>
                </Tabs>
            </React.Fragment>
        )
    }
}