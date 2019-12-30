import React from "react";
import styled from "styled-components";
const Footer = () => {
  return (
    <FooterContainer>
      <div className="shape"></div>
      <div className="footer">
        <div className="social">
          <i className={`fab fa-twitter-square socialItem`}></i>
          <i className={`fab fa-facebook-square socialItem`}></i>
          <i className={`fab fa-github socialItem`}></i>
          <i className={`fab fa-linkedin socialItem`}></i>
        </div>
        <div className="copyright">© 2019 Copyright Text </div>
      </div>
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  .shape {
    clip-path: polygon(50% 60%, 100% 0, 100% 100%, 0 100%, 0 0);
    background-color: #46494c;
    height: 5em;
    width: 100%;
  }
  .footer {
    background-color: #46494c;
    color: white;
  }
  .social {
    display: flex;
    justify-content: center;
    font-size: 2em;
    padding: 1em;
  }
  .socialItem {
    padding: 0.5em;
  }
  .copyright {
    padding: 1em;
  }
`;
export default Footer;
