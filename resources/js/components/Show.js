import React from 'react';
import axios from 'axios';
import Post from './Post';

class Show extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            post: {}
        };
    }

    componentDidMount() {

        console.log("We're in show.js")

        const postId = this.props.match.params.id;

        axios.get(`/api/posts/${postId}`)
        .then(response => {
            console.log(response.data);
            this.setState({
                post: response.data
            });
        })
        .catch(error => {
          this.setState({
            errors: error.response.data.errors
          })
        })

    }

    render() {

        return (
            <div className="container mx-auto">
                <Post id={this.state.post.id} title={this.state.post.title} body={this.state.post.body} />
            </div>
        );
    }

}

export default Show;