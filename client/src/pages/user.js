import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Post from '../components/post/post';
import StaticProfile from '../components/profile/staticProfile';
import { Grid } from '@material-ui/core';

import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';
import PostSkeleton from '../exports/postSkeleton';
import ProfileSkeleton from '../exports/profileSkeleton';


class user extends Component {

    state = {
        profile: null,
        urlId: null
    }

    componentDidMount() {

        const handle = this.props.match.params.handle;

        const postId = this.props.match.params.postId;
        if(postId) this.setState({ urlId: postId });

        this.props.getUserData(handle);

        axios.get(`/user/${handle}`)
            .then(response => {
                this.setState({ profile: response.data.user });
            })
            .catch(e => console.log(e));
    }

    render() {

        const { posts, loading } = this.props.data;
        const { urlId } = this.state;

        const displayPosts = loading ? (
            <PostSkeleton/>

        ) : posts === null ? (
            <p>no posts from this user</p>

        ) : !urlId ? ( // profile
            posts.map(post => <Post key={post.postId} post={post}/>)

        ) : ( // specific post
            posts.map(post => {
                if(post.postId !== urlId) {
                    return <Post key={post.postId} post={post}/>
                    
                } else {
                    return <Post key={post.postId} post={post} openDialog/>
                }
            })
        )

        return (
            <Grid container spacing={1} direction="row">
                <Grid item sm={8} xs={12}>
                    {displayPosts}
                </Grid>
                <Grid item sm={8} xs={12}>

                    {this.state.profile === null ? (
                        <ProfileSkeleton/>
                        
                    ) : (
                        <StaticProfile profile={this.state.profile}/>
                    )}
                </Grid>
            </Grid>
        )
    }
}

user.propTypes = {
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapState = state => ({
    data: state.data
})

export default connect(mapState, { getUserData })(user);
