import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WrappedButton from '../wrappedButton';
import { Favorite as HearthFilled, FavoriteBorder as HearthEmpty }from '@material-ui/icons';
import { likePost, unlikePost } from '../../redux/actions/dataActions';

export class LikeButton extends Component {

    likedPost = () => {
        if(this.props.user.likes && this.props.user.likes.find(like => like.postId === this.props.postId))
            return true;
        else return false;
    }

    likePost = () => {
        this.props.likePost(this.props.postId);
    }

    unlikePost = () => {
        this.props.unlikePost(this.props.postId);
    }

    render() {

        const { authenticated } = this.props.user;

        const likeButton = !authenticated ? (
            <Link to="/signin">
                <WrappedButton title="Like" padding={this.props.padding}>
                    <HearthEmpty color="primary"/>
                </WrappedButton>
            </Link>
        ) : (
            this.likedPost() ? (
                <WrappedButton title="remove Like" onClick={this.unlikePost} padding={this.props.padding}>
                    <HearthFilled color="primary"/>
                </WrappedButton>
            ) : (
                <WrappedButton title="Like" onClick={this.likePost} padding={this.props.padding}>
                    <HearthEmpty color="primary"/>
                </WrappedButton>
            )
        )

        return likeButton;
    }
}

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired,

    padding: PropTypes.string
}

const mapState = state => ({
    user: state.user
})

const mapActions = {
    likePost,
    unlikePost
}

export default connect(mapState, mapActions)(LikeButton);
