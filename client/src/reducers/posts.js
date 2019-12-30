import {
  GET_POSTS,
  ADD_POST,
  GET_POST_BY_ID,
  ADD_COMMENT,
  LIKE,
  DELETE_POST,
  DELETE_COMMENT,
  UPDATE_COMMENT
} from "../actions/types";
const initialState = {
  posts: [],
  post: {
    loading: true
  },
  loading: true,
  error: {}
};

//REDUCERS
export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        loading: false,
        posts: payload.reverse()
      };

    case ADD_POST:
      return {
        ...state,
        loading: false,
        posts: [payload, ...state.posts]
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload),
        loading: false
      };
    case DELETE_COMMENT:
      const updatedPost = state.post;
      updatedPost.comments = updatedPost.comments.filter(
        comment => comment._id.toString() !== payload
      );
      return {
        ...state,
        post: updatedPost
      };
    case UPDATE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comment: [payload, ...state.post.comments]
        }
      };
    case GET_POST_BY_ID:
      const currentPost = {
        _id: payload._id,
        name: payload.name,
        likes: payload.likes,
        title: payload.title,
        content: payload.content,
        comments: payload.comments,
        date: payload.date
      };
      return {
        ...state,
        post: currentPost
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: [payload, ...state.post.comments]
        }
      };

    case LIKE:
      const allPosts = state.posts;

      const newPosts = allPosts.map(i => {
        if (i._id === payload._id) return (i = payload);
        else return i;
      });
      return {
        ...state,
        posts: newPosts
      };
    default:
      return state;
  }
}
