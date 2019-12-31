import React, { useEffect } from "react";
import "./App.css";
import Posts from "./components/Posts/Posts";
import AddPost from "./components/AddPost/AddPost";
import Layout from "./Layout";
import store from "./store";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { loadUser } from "./actions/user";
import setAuthToken from "./utils/setAuthToken";
import ProtectedRoute from "./utils/ProtectedRoute";
import PostPage from "./components/Post/PostPage";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    if (localStorage.token) store.dispatch(loadUser());
  }, []);

  return (
    <Layout>
      <div>
        <Switch>
          <Route exact path="/" component={Posts} />
          <ProtectedRoute path="/addpost" component={AddPost} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/post/:id" component={PostPage} />
          <Route path="/about" component={About} />
          <Route path="/Contact" component={Contact} />
        </Switch>
      </div>
    </Layout>
  );
}

export default App;
