import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_POSTS,
  ADD_POST,
  GET_POST_BY_ID,
  GET_COMMENTS,
  ADD_COMMENT,
  LIKE,
  DELETE_POST,
  DELETE_COMMENT,
  UPDATE_COMMENT
} from "./types";

//ACTIONS---------------------------------------------

//GET ALL POSTS
export const getPosts = () => async dispatch => {
  const res = await axios("/api/posts");
  console.log(res.data);
  dispatch({
    type: GET_POSTS,
    payload: res.data
  });
};

//ADD NEW POST
export const addPost = formData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post("/api/posts", formData, config);

    dispatch({
      type: ADD_POST,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
  }
};

//GET POST BY ID
export const getPostById = id => async dispatch => {
  const post = await axios(`/api/posts/${id}`);
  dispatch({
    type: GET_POST_BY_ID,
    payload: post.data
  });
};

//DELETE A POST
export const deletePost = id => async dispatch => {
  try {
    await axios.delete(`/api/posts/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id
    });

    dispatch(setAlert("Post removed", "success"));
  } catch (err) {
    dispatch(setAlert(err.response.data, "danger"));
  }
};

//GET POST'S COMMENTS
export const getComments = id => async dispatch => {
  const comments = await axios(`/api/posts${id}/comments`);
  console.log(comments);
  dispatch({
    type: GET_COMMENTS,
    payload: comments.data
  });
};

//ADD NEW COMMENT
export const addComment = (id, formData) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const comment = await axios.post(
      `/api/posts/comments/${id}`,
      formData,
      config
    );
    dispatch({
      type: ADD_COMMENT,
      payload: comment.data
    });
  } catch (err) {}
};

//DELETE A COMMENT
export const deleteComment = (postID, commentID) => async dispatch => {
  try {
    await axios.delete(`/api/posts/comments/${postID}/${commentID}`);

    dispatch({
      type: DELETE_COMMENT,
      payload: commentID
    });

    dispatch(setAlert("Comment removed", "success"));
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, "danger"));
  }
};

//UPDATE A COMMENT
export const updateComment = (postID, commentID, text) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const data = {
    text: text
  };
  try {
    const updatedText = await axios.put(
      `/api/posts/comments/${postID}/${commentID}`,
      data,
      config
    );

    const comment = {
      updatedText,
      commentID,
      postID
    };

    dispatch({
      type: UPDATE_COMMENT,
      payload: comment
    });

    dispatch(setAlert("Comment updated", "success"));
  } catch (err) {
    console.log(err);
    dispatch(setAlert("Update failed", "danger"));
  }
};

//LIKE A POST
export const likePost = id => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const likes = await axios.post(`/api/posts/like/${id}`, config);

    dispatch({
      type: LIKE,
      payload: likes.data
    });
  } catch (err) {
    console.log(err);
  }
};
