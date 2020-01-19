import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';

class Post extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            redirectUrl: ''
        }

        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleEdit(event) {
        console.log('Editing post');
        const postId = event.target.getAttribute('data-id');
        console.log(postId);
        this.setState({
            redirectUrl: postId +'/edit',
            redirect: true
        });
    }

    handleDelete(event) {
        const postId = event.target.getAttribute('data-id');
        console.log(postId);
        axios.delete(`api/posts/${postId}`, {
            id: postId
        })
        .then(() => this.setState({ 
            redirectUrl: '/',
            redirect: true,
        }))
        .catch(error => {
          this.setState({
            errors: error.response.data.errors
          })
        })
    }

    render() {

        const { redirect } = this.state;

        if (redirect) {
            console.log("Redirect happening: " + this.state.redirectUrl);
            return <Redirect to={this.state.redirectUrl}/>;
        }

        return (
            <div className="max-w-sm w-full lg:max-w-full lg:flex mb-6">
                <div className="border-r border-b border-l border-gray-400 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal inline-block">
                    <div className="mb-8">
                    <p className="text-sm text-gray-600 flex items-center justify-end">
                        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-3" data-id={this.props.id} onClick={this.handleEdit}>
                            Edit
                        </button>
                        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" data-id={this.props.id} onClick={this.handleDelete}>
                            Delete
                        </button>
                    </p>

                    <div className="text-gray-900 font-bold text-xl mb-2"><Link to={`${this.props.id}`} className="block mt-4 lg:inline-block lg:mt-0 text-gray-900 hover:text-gray-600 mr-4">{this.props.title}</Link></div>
                    <p className="text-gray-700 text-base">{this.props.body}</p>
                    </div>
                    <div className="flex items-center">
                    <div className="text-sm">
                        <p className="text-gray-900 leading-none">Mag</p>
                        <p className="text-gray-600">January 13th 2020</p>
                    </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Post;