import React from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export class NewsEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = { text: '' };
        this.handleChange = this.handleChange.bind(this)
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

    render() {
        return (
            <React.Fragment>
                <ReactQuill
                    theme="snow"
                    modules={this.modules}
                    value={this.state.text}
                    onChange={this.handleChange}
                />
                <div className="mt-3">
                    <p>Toggle visibility:</p>
                    <button className="btn btn-lg btn-success btn-block">Visible</button>
                </div>

            </React.Fragment>
        )
    }
}