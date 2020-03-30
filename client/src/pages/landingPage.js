import axios from 'axios';
import React, { Component } from 'react';
import { Grid } from '@material-ui/core';

import Post from '../components/post';
import UserProfile from '../components/userProfile';


class LandingPage extends Component {

    state = { posts: null }

    componentDidMount() {
        axios.get('/posts')
            .then(response => {
                this.setState({
                    posts: response.data
                });
            })
            .catch(e => console.log(e));
    }

    render() {

        let recentPosts = this.state.posts ? (
            this.state.posts.map(post => <Post post={post} key={post.postId}/>)
            ) : ( <p> loading...</p> );

        return (
            <Grid container spacing={1}>
                <Grid item sm={8} xs={12}>
                    {recentPosts}
                </Grid>
                <Grid item sm={8} xs={12}>
                    <UserProfile/>
                </Grid>
            </Grid>
        );
    }
}

export default LandingPage
