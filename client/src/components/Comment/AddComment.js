import React, { useState } from "react";
import { connect } from "react-redux";
import { MDBBtn } from "mdbreact";
import { addComment } from "../../actions/post";
import styled from "styled-components";

const AddComment = ({ addComment, user, postId }) => {
  const [comment, setComment] = useState("");

  const submitHandler = e => {
    e.preventDefault();
    const formData = {
      text: comment,
      name: user.name
    };
    addComment(postId, formData);
    setComment("");
  };
  return (
    <AddCommentContainer>
      <h2>Add comment</h2>
      <form className="commentForm" onSubmit={e => submitHandler(e)}>
        <textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          type="text"
          className="commentInput"
        />
        <Button type="submit">Reply</Button>
      </form>
    </AddCommentContainer>
  );
};

const mapStateToProps = state => ({
  user: state.user.user,
  postId: state.post.post._id
});

const AddCommentContainer = styled.div`
  max-width: 30em;
  border-radius: 0.5em;
  box-shadow: 5px 5px 15px -1px rgba(0, 0, 0, 0.3);
  margin: 3em auto;
  text-align: center;
  color: #8a8a8a;
  .commentForm {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .commentInput {
    width: 95%;
    height: 7em;
    resize: none;
    overflow: hidden;
    border: 1px solid rgba(204, 204, 204, 0.267);
  }
`;

const Button = styled(MDBBtn)`
  padding: 0.2em 1em;
  font-size: 1em;
`;
export default connect(mapStateToProps, { addComment })(AddComment);
