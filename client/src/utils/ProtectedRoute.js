import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const ProtectedRoute = ({ component: Component, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (user && user.isAdmin) return <Component {...props} />;
        else {
          return (
            <Redirect
              to={{
                pathname: "/",
                from: props.location
              }}
            />
          );
        }
      }}
    />
  );
};

const mapStateToProps = state => ({
  user: state.user.user
});

export default connect(mapStateToProps)(ProtectedRoute);
