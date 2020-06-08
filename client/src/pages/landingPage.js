import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Post from '../components/post/post';
import { getPosts } from '../redux/actions/dataActions';
import PostSkeleton from '../exports/postSkeleton';
import LandingPageQuery from '../components/mediaQueries/landingPage';

class LandingPage extends Component {

    componentDidMount() {
        this.props.getPosts();
    }

    render() {
        const { posts, loading } = this.props.data;
        
        return (
            <LandingPageQuery>
                {loading ? (
                    <PostSkeleton/>
                ) : (
                    posts.map(post => 
                        <Post post={post} key={post.postId}/>)
                )}
            </LandingPageQuery>
        );
    }
}

LandingPage.propTypes = {
    getPosts: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapState = state => ({
    data: state.data
});

export default connect(mapState, { getPosts })(LandingPage)
