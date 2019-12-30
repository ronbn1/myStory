import React from "react";
import { MDBAlert, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { connect } from "react-redux";
const Alert = ({ alerts }) => {
  return (
    <MDBContainer>
      <MDBRow center>
        <MDBCol md="6">
          {alerts
            ? alerts.map(alert => (
                <MDBAlert color={alert.type} key={alert.id}>
                  {alert.msg}
                </MDBAlert>
              ))
            : ""}
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
const mapStateToProps = state => ({
  alerts: state.alert
});
export default connect(mapStateToProps)(Alert);
