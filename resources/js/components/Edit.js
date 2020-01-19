
import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router'

class Edit extends React.Component {

    constructor(props) {
        console.log("Edit called");
        super(props);

        this.state = {
            title: '',
            body:'',
            redirect: false
        };

        const postId = this.props.match.params.id;
        console.log(postId);
        axios.get(`/api/posts/${postId}`)
        .then(response => {
            console.log(response.data);
            this.setState({
                title: response.data.title,
                body: response.data.body,
                id: postId
            });
        })
        .catch(error => {
          this.setState({
            errors: error.response.data.errors
          })
        })

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleTitleChange(event) {
        this.setState({title: event.target.value});
    }

    handleBodyChange(event) {
        this.setState({body: event.target.value});
    }

    handleSubmit() {

        const config = { headers: {'Content-Type': 'application/json'} };
        const postId = this.props.match.params.id;

        axios.put(`/api/posts/${postId}`, {
            title: this.state.title,
            body: this.state.body
          }, config)
          .then((response) => this.setState({ redirect: true }))
          .catch(function (error) {
            console.log(error);
          });
    }

    render() {

        const { redirect } = this.state;

        if (redirect) {
          return <Redirect to='/'/>;
        }

        return (
            <div className="container mx-auto">
                <form className="w-full max-w-lg">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-title">
                            Title
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-title" type="text" value={this.state.title} onChange={this.handleTitleChange}  />
                        <p className="text-red-500 text-xs italic">What's it all about?</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-body">
                            Body
                        </label>
                        <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-body" type="textarea"  rows="20" cols="50" value={this.state.body} onChange={this.handleBodyChange} />
                        <p className="text-gray-600 text-xs italic"></p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={this.handleSubmit}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        );
    }

}

export default Edit;

