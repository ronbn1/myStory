import React, { useState } from "react";
import { connect } from "react-redux";
import { login } from "../../actions/user";
import { useHistory } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link-offset";
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCard,
  MDBCardBody,
  MDBBtn
} from "mdbreact";

const Login = ({ login, user: { user } }) => {
  const initialState = {
    email: "",
    password: ""
  };
  const [formData, setFormData] = useState(initialState);
  const history = useHistory();

  if (user) {
    history.push("/");
  }

  const onChangeForm = e => {
    setFormData({
      ...formData,
      [e.target.type]: e.target.value
    });
  };
  const submitHandler = e => {
    e.preventDefault();
    const data = formData;
    login(data);
  };

  return (
    <MDBRow center className="my-4 " id="login">
      <MDBCol md="6">
        <MDBCard>
          <MDBCardBody>
            <form onSubmit={e => submitHandler(e)}>
              <p className="h4 text-center py-4">Sign in</p>
              <div className="grey-text">
                <MDBInput
                  label="Your email"
                  icon="envelope"
                  group
                  type="email"
                  onChange={e => onChangeForm(e)}
                />

                <MDBInput
                  label="Your password"
                  icon="lock"
                  group
                  type="password"
                  onChange={e => onChangeForm(e)}
                />
              </div>
              <div className="text-center py-4 mt-3">
                <MDBBtn outline={true} color="cyan" type="submit">
                  LOGIN
                </MDBBtn>
              </div>
              <p style={{ fontSize: "0.8em", color: "#37474F" }}>
                Dont have an acount?
                <Link
                  smooth
                  style={{ color: "#37474F" }}
                  to="/register#register"
                >
                  REGISTER
                </Link>
              </p>
            </form>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { login })(Login);
