import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import Post from './Post';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
    }

    componentDidMount() {

        Axios.get('api/posts')
        .then(response => {
            this.setState({
                posts: response.data
            });
        })
        .catch(error => {
          this.setState({
            errors: error.response.data.errors
          })
        })

    }

    render() {

        let posts = this.state.posts.map((item, key) =>
        <Post key={key} title={item.title} body={item.body} />
        );

        return (
            <div>
                {posts}
            </div>

        );
    }

}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
