import axios from 'axios';
import React, { Component } from 'react';
import { Grid } from '@material-ui/core';

import Post from '../components/post'

class LandingPage extends Component {

    state = { posts: null }

    componentDidMount() {
        axios.get('/posts')
            .then(response => {
                this.setState({
                    posts: response.data
                })
            })
            .catch(e => console.log(e));
    }

    render() {

        let recentPostsMarkup = this.state.posts ? (
            this.state.posts.map(post => <Post post={post} key={post.postId}/>)
            ) : ( <p> loading...</p> );

        return (
            <Grid container spacing={1}>
                <Grid item sm={8} xs={12}>
                    {recentPostsMarkup}
                </Grid>
                <Grid item sm={8} xs={12}>
                    <p>content</p>
                </Grid>
            </Grid>
        );
    }
}

export default LandingPage
