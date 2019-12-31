import React, { useState } from "react";
import { connect } from "react-redux";
import { register } from "../../actions/user";
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
const Register = ({ register, user: { user } }) => {
  const initialState = {
    name: "",
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
      [e.target.name]: e.target.value
    });
  };

  const submitHandler = e => {
    e.preventDefault();
    register(formData);
  };

  return (
    <MDBRow center className="my-4">
      <MDBCol md="6" id="register">
        <MDBCard>
          <MDBCardBody>
            <form onSubmit={e => submitHandler(e)}>
              <p className="h4 text-center py-4">Sign up</p>
              <div className="grey-text">
                <MDBInput
                  label="Your name"
                  icon="envelope"
                  group
                  type="text"
                  name="name"
                  onChange={e => onChangeForm(e)}
                />

                <MDBInput
                  label="Your email"
                  icon="envelope"
                  group
                  name="email"
                  onChange={e => onChangeForm(e)}
                />

                <MDBInput
                  label="Your password"
                  icon="lock"
                  group
                  type="password"
                  name="password"
                  onChange={e => onChangeForm(e)}
                />
              </div>
              <div className="text-center py-4 mt-3">
                <MDBBtn outline={true} color="cyan" type="submit">
                  REGISTER
                </MDBBtn>
              </div>
              <p style={{ fontSize: "0.8em", color: "#37474F" }}>
                Alreay have an acount?{" "}
                <Link smooth style={{ color: "#37474F" }} to="/login#login">
                  LOGIN{" "}
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
export default connect(mapStateToProps, { register })(Register);
