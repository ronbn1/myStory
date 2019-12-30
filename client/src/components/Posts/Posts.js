import React, { useEffect } from "react";
import Post from "../Post/Post";
import { getPosts } from "../../actions/post";
import { connect } from "react-redux";

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <div>
      {loading
        ? "loading"
        : posts.map(post => <Post key={post._id} post={post} />)}
    </div>
  );
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
