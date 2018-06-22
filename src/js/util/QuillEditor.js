import React from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {alertTypes} from "./Alert";
import {sendNewsPost, updateNewsPost} from "./APIUtils";


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
            id: (props.editMode) ? props.newsPostId : "",
            title: (props.editMode) ? props.title : "",
            content: (props.editMode) ? props.content : "",
            visible: (props.editMode) ? props.visible : false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleQuillChange = this.handleQuillChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.switchVisibility = this.switchVisibility.bind(this);
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

    handleSubmit(event) {
        event.preventDefault();

        if(this.state.title.length < 6 || this.state.content.length < 20) {
            this.props.sendAlert({
                alertType: alertTypes.NEUTRAL,
                message: "This post appears to be too short."
            });

        } else {

            if (this.props.editMode) {

                let newsPostData = this.state;

                updateNewsPost(newsPostData)
                    .then(() => {
                        this.props.sendAlert({
                            alertType: alertTypes.SUCCESS,
                            message: "Your post has been updated successfully!"
                        });
                        this.setState({title: "", content: ""})

                    }).catch(error => {
                    this.props.sendAlert({
                        alertType: alertTypes.ERROR,
                        message: error.information
                    });
                })

            } else {

                sendNewsPost(this.state)
                    .then(() => {
                        this.props.sendAlert({
                            alertType: alertTypes.SUCCESS,
                            message: "Your post has been saved successfully!"
                        });
                        this.setState({title: "", content: ""})

                    }).catch(error => {
                    this.props.sendAlert({
                        alertType: alertTypes.ERROR,
                        message: error.information
                    });
                })
            }
        }
    }

    render() {

        return (
            <React.Fragment>
                {(this.props.editMode) ? <h5> Post title </h5> : null}
                <input type="text"
                       name="title"
                       className="form-control mb-3"
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
                    <span>visibility on main page:</span>
                    <VisibilityButton visible={this.state.visible} handleClick={this.switchVisibility}/>
                    <button className="btn btn-success float-right" onClick={this.handleSubmit}>
                        Submit
                    </button>
                </div>
            </React.Fragment>
        )
    }
}

function VisibilityButton(props) {

    if(props.visible) {

        return (
            <button className="btn btn-success ml-2" onClick={props.handleClick}>
                <i className="fa fa-eye mr-1" aria-hidden="true"></i>
                Visible
            </button>
        )
    } else {
        return(
            <button className="btn btn-secondary ml-2" onClick={props.handleClick}>
                <i className="fa fa-eye-slash mr-1" aria-hidden="true"></i>
                Not visible
            </button>
        )
    }
}