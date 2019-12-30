import React, { useState } from "react";
import { MDBBtn } from "mdbreact";
import styled from "styled-components";
const Contact = () => {
  const initState = {
    title: "",
    content: ""
  };
  const [data, setData] = useState(initState);
  const onChange = e => setData({ ...data, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    setData(initState);
  };

  return (
    <ContactContaier id="contact">
      <h2 className="title">Contact Me</h2>
      <form onSubmit={e => onSubmit(e)}>
        <div>
          <input
            type="text"
            name="title"
            placeholder="Subject"
            required="required"
            value={data.title}
            onChange={e => onChange(e)}
          />
        </div>

        <div>
          <textarea
            name="content"
            placeholder="Content"
            required="required"
            value={data.content}
            onChange={e => onChange(e)}
          ></textarea>
        </div>
        <div className="btnContainer">
          <Button type="submit">SEND</Button>
        </div>
      </form>
    </ContactContaier>
  );
};

const ContactContaier = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    color: #46494c;
    border-bottom: 0.1em solid #2bbbad;
    padding-bottom: 0.2em;
    margin-bottom: 0.5em;
  }
  form {
    padding: 1em;
    width: 100%;
  }
  textarea,
  input {
    margin: 0.3em;
    width: 100%;
    resize: none;
    overflow: hidden;
    border: 1px solid #80808056;
    padding: 0.5em;
  }

  .btnContainer {
    display: flex;
    justify-content: center;
  }
`;

const Button = styled(MDBBtn)`
  padding: 0.5em 1.5em;
`;
export default Contact;
