import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';

import Post from '../components/post/post';
import UserProfile from '../components/profile/userProfile';
import { getPosts } from '../redux/actions/dataActions';


class LandingPage extends Component {

    componentDidMount() {
        this.props.getPosts();
    }

    render() {
        const { posts, loading } = this.props.data;

        let recentPosts = !loading ? (
            posts.map(post => <Post post={post} key={post.postId}/>)
            ) : ( <p> loading...</p> );

        return (
            <Grid container spacing={1} direction="row">
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

LandingPage.propTypes = {
    getPosts: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapState = state => ({
    data: state.data
})

export default connect(mapState, { getPosts })(LandingPage)
