import React from "react";
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {Alert} from "../../../util/Alert";
import {NewsLister} from "./NewsLister";
import {NewsCreator} from "./NewsCreator";


export class NewsFeedAdmin extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            alertType: "",
            tabIndex: 0,
        };

        this.setAlert = this.setAlert.bind(this);
        this.setTabIndex = this.setTabIndex.bind(this);
    }

    setAlert(alert) {
        this.setState({
            alertType: alert.alertType,
            message: alert.message,
            tabIndex: 0,
        })
    }

    setTabIndex(tabIndex) {
        this.setState({
            tabIndex: tabIndex,
            alertType: "",
            message: ""
        })
    }

    render() {

        let alert = (this.state.alertType)
            ? <Alert alertType={this.state.alertType} message={this.state.message}/>
            : null;

        return(
            <React.Fragment>
                {alert}
                <Tabs selectedIndex={this.state.tabIndex} onSelect={this.setTabIndex}>
                    <TabList>
                        <Tab>Existing entries</Tab>
                        <Tab>Create a new entry</Tab>
                    </TabList>
                    <TabPanel>
                        <NewsLister sendAlert={this.setAlert}/>
                    </TabPanel>
                    <TabPanel>
                        <NewsCreator sendAlert={this.setAlert}/>
                    </TabPanel>
                </Tabs>
            </React.Fragment>
        )
    }
}