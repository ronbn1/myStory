import axios from "axios";
import { LOG_IN, REGISTER, USER_LOADED, LOGOUT, AUTH_ERROR } from "./types";
import setAuthToken from "../utils/setAuthToken";
import { setAlert } from "./alert";

//ACTIONS---------------------------------------------

// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/users"); //res.data -> user data

    if (res.data.email === "ron@benaish.com") res.data.isAdmin = true;
    else res.data.isAdmin = false;

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

//REGISTER NEW USER
export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post("/api/users/register", body, config);
    dispatch({
      type: REGISTER,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    dispatch(setAlert(err.response.data, "danger"));
  }
};

//login
export const login = ({ email, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/users/login", body, config);
    dispatch({
      type: LOG_IN,
      payload: res.data //token
    });

    dispatch(loadUser());
  } catch (err) {
    dispatch(setAlert(err.response.data, "danger"));
  }
};

//logout
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};
