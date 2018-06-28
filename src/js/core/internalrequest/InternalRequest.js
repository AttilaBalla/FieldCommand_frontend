import React from "react";
import 'react-tabs/style/react-tabs.css';
import {Alert} from "../../util/Alert";
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import {InternalRequestCreator} from "./InternalRequestCreator";
import {InternalRequestLister} from "./InternalRequestLister";


export class InternalRequest extends React.Component {

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
                <h2>Internal requests</h2>
                <Tabs defaultIndex={0}>
                    <TabList>
                        <Tab>Existing entries</Tab>
                        <Tab>Create a new entry</Tab>
                    </TabList>
                    <TabPanel>
                        <InternalRequestLister sendAlert={this.setAlert}/>
                    </TabPanel>
                    <TabPanel>
                        <InternalRequestCreator sendAlert={this.setAlert}/>
                    </TabPanel>
                </Tabs>
            </React.Fragment>
        )
    }
}