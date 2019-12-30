import React, { useEffect } from "react";
import { HashLink as Link } from "react-router-hash-link-offset";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { getPostById, deletePost } from "../../actions/post";
import Comments from "../Comment/Comments";
import ReactHtmlParser from "react-html-parser";
import styled from "styled-components";
import { MDBBtn } from "mdbreact";

const PostPage = ({ post, getPostById, match, user, deletePost }) => {
  useEffect(() => {
    getPostById(match.params.id);
  }, [match.params.id, getPostById]);

  const history = useHistory();
  const deleteHandler = () => {
    deletePost(post._id);
    history.push("/");
  };
  return (
    <Container>
      {post.loading ? (
        ""
      ) : (
        <div>
          <div className="post_header">
            <h1>{`${post.title}`}</h1>
            {!user.loading && user.user.isAdmin ? (
              <DeleteButton onClick={() => deleteHandler()} color="elegant">
                DELETE
              </DeleteButton>
            ) : (
              ""
            )}
          </div>
          <div>{ReactHtmlParser(post.content)}</div>
          {user.isAuthenticated ? (
            <Comments />
          ) : (
            <h3>
              <Link to="/login#login">Login</Link> to see the comments
            </h3>
          )}
        </div>
      )}
    </Container>
  );
};

const mapStateToProps = state => ({
  post: state.post.post,
  user: state.user
});

const Container = styled.div`
  h3 {
    text-align: center;
  }
  h3 a {
    color: black;
  }

  .post_header {
    display: flex;
    justify-content: space-between;
  }
`;
const DeleteButton = styled(MDBBtn)`
  padding: 0 0.8em 0 0.8em;
  z-index: 0;
  height: 1.3em;
`;

export default connect(mapStateToProps, { getPostById, deletePost })(PostPage);
