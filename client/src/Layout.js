import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Alert from "./components/Alert/Alert";
import styled from "styled-components";
const Layout = props => {
  return (
    <>
      <Header />
      <Container>
        <Alert />
        <div>{props.children}</div>
      </Container>
      <Footer />
    </>
  );
};
const Container = styled.div`
  max-width: 1020px;
  margin: 0 auto;
  padding: 2em;

  @media (max-width: 575.98px) {
    margin: 0 auto;
    padding: 1em;
  }
`;
export default Layout;
