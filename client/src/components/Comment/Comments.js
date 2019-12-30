import React from "react";
import { connect } from "react-redux";
import AddComment from "./AddComment";
import Comment from "./Comment";
import styled from "styled-components";
const Comments = ({ comments }) => {
  return (
    <Container>
      {comments.map(comment => {
        return <Comment key={comment._id} comment={comment}></Comment>;
      })}

      <AddComment id="addComment" />
    </Container>
  );
};

const mapStateToProps = state => ({
  comments: state.post.post.comments
});

const Container = styled.div`
  margin-top: 4em;
`;
export default connect(mapStateToProps)(Comments);
