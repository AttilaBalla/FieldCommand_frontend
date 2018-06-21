import React from "react";
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {QuillEditor} from "../../../util/QuillEditor";
import {Alert} from "../../../util/Alert";
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
                <Tabs defaultIndex={0}>
                    <TabList>
                        <Tab>Existing entries</Tab>
                        <Tab>Create a new entry</Tab>
                    </TabList>
                    <TabPanel>
                        <NewsLister/>
                    </TabPanel>
                    <TabPanel>
                        <QuillEditor sendAlert={this.setAlert}/>
                    </TabPanel>
                </Tabs>
            </React.Fragment>
        )
    }
}