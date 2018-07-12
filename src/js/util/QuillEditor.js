import React from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {ProjectBadge, projectBadges} from "./ProjectBadge";

export class QuillEditor extends React.Component {

    modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            [{ 'font': [] }],
            ['bold', 'italic', 'underline','strike', 'blockquote'],
            [{ 'align': [] }],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            [{ 'color': [] }, { 'background': [] }],
            ['link', 'image'],
            ['clean'],
        ],
    };

    constructor(props) {
        super(props);

        this.state = {
            title: (props.editMode) ? props.title : "",
            content: (props.editMode) ? props.content : "",
            visible: (props.editMode) ? props.visible : null,
            projectName: (props.editMode) ? props.project : "ROTR"
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleQuillChange = this.handleQuillChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.switchVisibility = this.switchVisibility.bind(this);
        this.setProject = this.setProject.bind(this);
    }

    handleQuillChange(value) {
        this.setState({ content: value })
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    switchVisibility() {
        this.setState({visible: (!this.state.visible)})
    }

    setProject(project) {
        this.setState({projectName: project});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.sendContent(this.state);
    }

    render() {

        return (
            <React.Fragment>
                <input type="text"
                       name="title"
                       className="form-control mb-3 mt-3"
                       onChange={this.handleChange}
                       value={this.state.title}
                       placeholder="Post Title"
                       />
                <ReactQuill
                    theme="snow"
                    modules={this.modules}
                    value={this.state.content}
                    onChange={this.handleQuillChange}
                    placeholder="Enter some stuff here..."
                />
                <div className="mt-3">
                    {(this.props.toggleVisibility)
                        ? <VisibilityButton visible={this.state.visible} handleClick={this.switchVisibility}/>
                        : null}
                    {(this.props.toggleProjectSelect)
                        ? <ProjectsButtonGroup setProject={this.setProject} activeProject={this.state.projectName}/>
                        : null}
                    <button className="btn btn-success float-right" onClick={this.handleSubmit}>
                        Submit
                    </button>
                </div>
            </React.Fragment>
        )
    }
}

function VisibilityButton(props) {

    let button;

    if(props.visible) {

        button =
            <button className="btn btn-success ml-2" onClick={props.handleClick}>
                <i className="fa fa-eye mr-1" aria-hidden="true"></i>
                Visible
            </button>;

    } else {

        button =
            <button className="btn btn-secondary ml-2" onClick={props.handleClick}>
                <i className="fa fa-eye-slash mr-1" aria-hidden="true"></i>
                Not visible
            </button>;
    }

    return(
        <React.Fragment>
            <span>visibility on main page:</span>
            {button}
        </React.Fragment>
    )
}

class ProjectsButtonGroup extends React.Component {

    constructor(props) {
        super(props);

        this.activeProject = "ROTR";
        this.projectList = Object.keys(projectBadges).map(i => projectBadges[i]); // k so dis thing makes map() usable on nested objects
        this.setActiveProject = this.setActiveProject.bind(this);
    }

    componentWillReceiveProps(nextProps) { // I <3 this thing
        this.activeProject = nextProps.activeProject;
    }

    setActiveProject(activeProject) {
        this.props.setProject(activeProject);
    }

    render() {
        let projectButtons = this.projectList.map((project, key) => {

            return(
                <ProjectButton
                    active={(project.projectShortName === this.activeProject)}
                    key={key}
                    project={project.projectShortName}
                    setProject={this.setActiveProject}
                />
            )
        });

        return (
            <div className="btn-group btn-group-toggle btn-group-blue">
                {projectButtons}
            </div>
        )
    }
}

class ProjectButton extends React.Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.setProject(this.props.project);
    }

    render() {

        let buttonClass = (this.props.active) ? "btn btn-blue active" : "btn btn-blue";

        return (
            <button className={buttonClass} onClick={this.handleClick}>
                <ProjectBadge project={this.props.project} displayName={true}/>
            </button>
        )
    }
}
