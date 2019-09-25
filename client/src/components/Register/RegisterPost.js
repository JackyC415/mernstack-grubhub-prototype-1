import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/postActions';

class RegisterPost extends Component {

    componentWillMount() {
        this.props.fetchPosts();
    }

    render() {
        return (
            <div>
                <h1>Posts</h1>  
            </div>
        )
    }
}

RegisterPost.propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    posts: state.posts.items
})

export default connect(mapStateToProps, {fetchPosts})(RegisterPost);