import React, { useState } from "react";
import { connect } from "react-redux";
import { MDBBtn } from "mdbreact";
import { likePost, deletePost, getPostById } from "../../actions/post";
import { HashLink as Link } from "react-router-hash-link";
import ReactHtmlParser from "react-html-parser";
import styled from "styled-components";

const Post = ({ post, likePost, user, deletePost }) => {
  let liked = "";
  const userId = user.loading
    ? ""
    : user.isAuthenticated
    ? user.user._id.toString()
    : "";
  if (userId !== null) {
  }
  liked = post.likes.includes(userId);

  const [isClicked, setIsClicked] = useState();

  const clikeHandle = () => {
    setIsClicked(liked);
    likePost(post._id);
  };
  const deleteHandler = () => {
    deletePost(post._id);
  };
  return (
    <BlogPost>
      <div className="post_header">
        <div className="top">
          <h1>{post.title}</h1>
          {!user.loading && user.user && user.user.isAdmin ? (
            <DeleteButton onClick={() => deleteHandler()} color="elegant">
              DELETE
            </DeleteButton>
          ) : (
            ""
          )}
        </div>
        <span>By {post.name}</span>
        <h2>{post.date.slice(0, 10)}</h2>
      </div>
      <div className="blog_content">{ReactHtmlParser(post.content)}</div>
      <div className="post_footer">
        <ReadMoreButton>
          <Link to={`post/${post._id}`}>More Read ...</Link>
        </ReadMoreButton>
        {!user.loading && user.isAuthenticated ? (
          <div>
            <i
              onClick={() => clikeHandle()}
              className={
                liked ? `fas fa-heart likeIcon` : `far fa-heart likeIcon`
              }
            >
              <span className="num">{post.likes.length}</span>
            </i>
            <Link to={`post/${post._id}#addComment`}>
              <i className={`far fa-comment likeIcon `}>
                <span className="num"> {post.comments.length}</span>
              </i>
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
    </BlogPost>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

const BlogPost = styled.div`
  background: #fff;
  margin: 0 auto 2em auto;
  padding: 35px 30px;
  box-shadow: 5px 5px 15px -1px rgba(0, 0, 0, 0.3);

  .post_header {
    .top {
      display: flex;
      justify-content: space-between;
      h1 {
        color: #4c5c68;
      }
    }
    h2 {
      font-size: 1em;
      font-weight: 400;
      color: #9c9c9c;
      margin-bottom: 3em;
      text-decoration: underline;
    }
    span {
      color: #9c9c9c;
    }
  }

  .post_footer {
    display: flex;
    justify-content: space-between;
    margin-top: 3em;
  }
  .blog_content {
    font-size: 1em;
    border-left: 5px solid #8ee5ee;
    padding-left: 15px;
  }

  .likeIcon {
    padding: 0.5em;
    font-size: 1.5em;
    color: rgb(206, 85, 85);
    &:hover {
      cursor: pointer;
    }
  }
  .num {
    color: black;
    font-size: 0.5em;
    margin-left: 0.3em;
  }
  &:hover {
    box-shadow: 5px 5px 20px -1px rgba(0, 0, 0, 0.3);
  }
  @media (max-width: 575.98px) {
    background: #fff;
    margin: 0 auto 2em auto;
    padding: 35px 30px;
    box-shadow: 5px 5px 15px -1px rgba(0, 0, 0, 0.3);
  }
`;

const ReadMoreButton = styled(MDBBtn)`
  padding: 0.3em 0.6em;
  z-index: 0;
`;

const DeleteButton = styled(MDBBtn)`
  padding: 0 0.8em 0 0.8em;
  z-index: 0;
  height: 1.3em;
`;

export default connect(mapStateToProps, { getPostById, likePost, deletePost })(
  Post
);
