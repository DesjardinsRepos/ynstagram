import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';

import Post from '../components/post/post';
import UserProfile from '../components/profile/userProfile';
import { getPosts } from '../redux/actions/dataActions';
import PostSkeleton from '../exports/postSkeleton';

class LandingPage extends Component {

    componentDidMount() {
        this.props.getPosts();
    }

    render() {
        const { posts, loading } = this.props.data;

        let recentPosts = !loading ? (
            posts.map(post => <Post post={post} key={post.postId}/>)
            ) : ( 
                <PostSkeleton/>
            );

        return (
            <Grid container spacing={2} justify="center">
                <Grid item xs={12} sm={9}>
                    {recentPosts}
                </Grid>
                <Grid item xs={12} sm={3}>
                    <UserProfile/>
                </Grid>
            </Grid>
        );
    }
}

LandingPage.propTypes = {
    getPosts: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapState = state => ({
    data: state.data
})

export default connect(mapState, { getPosts })(LandingPage)
