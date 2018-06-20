import React from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {alertTypes} from "../../../util/Alert";
import {sendNewsPost} from "../../../util/APIUtils";


export class NewsEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            content: "",
            visible: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleQuillChange = this.handleQuillChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.switchVisibility = this.switchVisibility.bind(this);
    }

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

        sendNewsPost(this.state)
            .then(() => {
                this.props.sendAlert({
                    alertType: alertTypes.SUCCESS,
                    message: "Your changes have been saved successfully!"
                });

            }).catch(error => {
            this.props.sendAlert({
                alertType: alertTypes.ERROR,
                message: error.information
            });
        })
    }

    render() {
        return (
            <React.Fragment>
                <input type="text"
                       name="title"
                       className="form-control mb-3"
                       onChange={this.handleChange}
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
                    <span>Visible on main page:</span>
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