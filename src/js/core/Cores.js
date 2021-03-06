import React, {Component} from "react";
import {Newsfeed} from "./newsfeed/Newsfeed.js";
import {Timeline} from "./timeline/Timeline.js";
import {AboutContent} from "./about/AboutContent";
import {Banner} from "./banners/Banner";
import Route from "react-router-dom/es/Route";
import {Navbar} from "../main/Navbar";
import {Footer} from "../main/Footer";
import {Administration} from "./administration/Administration";
import '../../css/sidebar.css';
import '../../css/admin.css';
import {InternalRequestEditor} from "./internalrequest/InternalRequestEditor";
import {InternalRequest} from "./internalrequest/InternalRequest";
import {NewsViewer} from "./news/NewsViewer";
import {NewsPage} from "./news/NewsPage";


export class Main extends Component {

    render() {
        return (
            <React.Fragment>
                <Navbar/>
                    <Route exact path="/" component={HomeContainer}/>
                    <Route exact path="/about" component={AboutContainer}/>
                    <Route exact path="/news" component={NewsContainer}/>
                    <Route exact path="/news/:id" component={NewsPage}/>
                    <Route exact path="/requests" component={InternalRequestContainer}/>
                    <Route exact path="/requests/:id" component={InternalRequestEditor} />
                <Route exact path="/administration/*" component={AdminContainer}/>
                <Footer/>
            </React.Fragment>
        )
    }
}


class HomeContainer extends React.Component {

    render() {
        return (
            <React.Fragment>
                <Banner/>
                <div className="row core_container">
                    <div className="col-md-9 text_box">
                        <Newsfeed/>
                    </div>
                    <Timeline/>
                </div>
            </React.Fragment>
        )
    }
}


class AboutContainer extends React.Component {

    render() {
        return (
            <div className="container-fluid">
                <AboutContent/>
            </div>
        )
    }
}

class NewsContainer extends React.Component {

    render() {
        return (
            <div className="container-fluid">
                <NewsViewer/>
            </div>
        )
    }
}


class AdminContainer extends React.Component {

    render() {
        return (
            <div className="container-fluid core_container">
                <Administration/>
            </div>
        )
    }
}


class InternalRequestContainer extends React.Component {

    render() {
        return (
            <div className="container-fluid">
                <div className="core_container text_box">
                    <InternalRequest/>
                </div>
            </div>
        )
    }
}