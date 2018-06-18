import React from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export class NewsEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            visible: false
        };
        this.handleChange = this.handleChange.bind(this);
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

    handleChange(value) {
        this.setState({ text: value })
    }

    switchVisibility() {
        this.setState({visible: (!this.state.visible)})
    }

    handleSubmit() {
        //TODO submit stuff to backend + error handling
    }

    render() {
        return (
            <React.Fragment>
                <h5>Create a new entry</h5>
                <ReactQuill
                    theme="snow"
                    modules={this.modules}
                    value={this.state.text}
                    onChange={this.handleChange}
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