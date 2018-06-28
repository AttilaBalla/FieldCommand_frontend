import React from "react";
import {AdminSidebar} from "./AdminSidebar";
import {UserAdmin} from "./useradmin/UserAdmin";
import {Redirect, Route} from "react-router-dom";
import {UserContext} from "../../util/UserProvider";
import {NewsFeedAdmin} from "./newsfeedadmin/NewsFeedAdmin";
import {NewsEditor} from "./newsfeedadmin/NewsEditor";


export function Administration() {

    return(
        <UserContext.Consumer>
            {value => {

                const {user} = value;
                if(user) { //TODO access control stuffz (user.simpleAuthorities)

                    return(
                    <div className="row">
                        <nav className="col-md-2 d-md-block sidebar main_color_dark">
                            <AdminSidebar user={user}/>
                        </nav>
                        <div className="col-md-10 admin_container">
                            <Route path='/administration/users' component={UserAdmin}/>
                            <Route path='/administration/newsfeed' component={NewsFeedAdmin}/>
                            <Route exact path="/administration/newseditor/:id" component={NewsEditor}/>
                        </div>
                    </div>
                    )
                }
                else {
                    return(
                        <Redirect to="/"/>
                    )
                }
            }}
        </UserContext.Consumer>
    )
}