import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/post";
import { MDBBtn } from "mdbreact";
import { updateComment } from "../../actions/post";

const Comment = ({ comment, user, deleteComment, post, updateComment }) => {
  const [edit, setEdit] = useState(false);
  const [content, setContent] = useState(comment.text);

  const deleteHandle = () => {
    deleteComment(post._id, comment._id);
  };

  const handleUpdate = () => {
    updateComment(post._id, comment._id, content);
    setEdit(false);
  };

  return (
    <CommentContainer>
      <div className="top">
        <div className="left">
          <p className="name">{comment.name}</p>
          {comment.date ? (
            <p className="date">{comment.date.slice(0, 10)}</p>
          ) : (
            <p className="date">NOW</p>
          )}
        </div>

        {(!user.loading && user._id.toString() === comment.author.toString()) ||
        (!user.loading && user.email === "ron@benaish.com") ? (
          <div>
            <i
              onClick={() => deleteHandle()}
              className="far fa-times-circle close"
            ></i>
            <i onClick={() => setEdit(!edit)} className="fas fa-edit edit"></i>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="main">
        {edit ? (
          <div className="editMod">
            <textarea
              onChange={e => setContent(e.target.value)}
              value={content}
            />
            <Button onClick={() => handleUpdate()}>Update</Button>
          </div>
        ) : (
          <p className="content">{content}</p>
        )}
      </div>
    </CommentContainer>
  );
};

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 30em;
  border-radius: 0.2em;
  box-shadow: 2px 2px 10px -1px rgba(0, 0, 0, 0.2);
  margin: 1em auto;
  text-align: center;
  color: #8a8a8a;
  padding: 0.5em 2em 2em 0;
  overflow: hidden;

  .top {
    display: flex;
    justify-content: space-between;
  }
  .close {
    font-size: 1em;
    margin: 0.5em -1em 0 0;
    cursor: pointer;
  }
  .edit {
    margin: 0.5em 1em 0 0;
    cursor: pointer;
  }
  .editMod {
    display: flex;
    flex-direction: column;
    width: 100%;

    textarea {
      color: #8a8a8a;
      width: 90%;
      overflow: hidden;
      resize: none;
      height: 8em;
      align-self: flex-end;
      border: 1px solid #dcdcdd;
      border-radius: 5px;
    }
    button {
      align-self: center;
      margin-top: 1em;
    }
  }
  .left {
    display: flex;
    align-items: flex-start;
    margin-left: 1.5em;
    .name {
      font-size: 1.5em;
    }
    .date {
      margin: 0.8em 0 0 1em;
      font-size: 0.8em;
    }
  }
  .main {
    display: flex;
    justify-content: center;
    .content {
      margin: 0;
    }
  }
`;

const Button = styled(MDBBtn)`
  width: 4em;
  margin: 0;
  padding: 0;
`;
const mapStateToProps = state => ({
  post: state.post.post,
  user: state.user.user
});
export default connect(mapStateToProps, { deleteComment, updateComment })(
  Comment
);
