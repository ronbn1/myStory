import React from "react";
import { connect } from "react-redux";
import AddComment from "./AddComment";
import Comment from "./Comment";
const Comments = ({ post }) => {
  return (
    <div>
      {post.comments.map(comment => {
        return <Comment key={comment._id} comment={comment}></Comment>;
      })}

      <AddComment id="addComment" />
    </div>
  );
};

const mapStateToProps = state => ({
  post: state.post.post
});
export default connect(mapStateToProps)(Comments);
