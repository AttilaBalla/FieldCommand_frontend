import React from "react";
import 'react-tabs/style/react-tabs.css';
import {Alert, alertTypes} from "../../util/Alert";
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import {UserContext} from "../../util/UserProvider";
import {InternalRequestCreator} from "./InternalRequestCreator";
import {InternalRequestLister} from "./InternalRequestLister";
import {Redirect} from "react-router-dom";


export class InternalRequest extends React.Component {

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

        let newTabIndex = this.state.tabIndex;

        if(alert.alertType === alertTypes.SUCCESS) {
            newTabIndex = 0;
        }

        this.setState({
            alertType: alert.alertType,
            messages: alert.messages,
            tabIndex: newTabIndex,
        })
    }

    setTabIndex(tabIndex) {
        this.setState({
            tabIndex: tabIndex,
            alertType: "",
            messages: ""
        })
    }

    render() {

        let alert = (this.state.alertType)
            ? <Alert alertType={this.state.alertType} messages={this.state.messages}/>
            : null;

        return(

            <UserContext.Consumer>

                {value => {
                    const {user} = value;

                    if(user == null) {
                        return <Redirect to={"/"}/> // TODO 403
                    }

                    return (<React.Fragment>
                        {alert}
                        <h2>Internal requests</h2>
                        <Tabs selectedIndex={this.state.tabIndex} onSelect={this.setTabIndex}>
                            <TabList>
                                <Tab>Existing entries</Tab>
                                <Tab>Create a new entry</Tab>
                            </TabList>
                            <TabPanel>
                                <InternalRequestLister currentUser={user} sendAlert={this.setAlert}/>
                            </TabPanel>
                            <TabPanel>
                                <InternalRequestCreator sendAlert={this.setAlert}/>
                            </TabPanel>
                        </Tabs>
                    </React.Fragment>)
                }}
            </UserContext.Consumer>
        )
    }
}