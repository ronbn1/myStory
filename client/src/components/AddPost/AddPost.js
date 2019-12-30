import React, { useState } from "react";
import { addPost } from "../../actions/post";
import { connect } from "react-redux";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useHistory } from "react-router-dom";
import { MDBBtn } from "mdbreact";
import styled from "styled-components";

const AddPost = ({ addPost }) => {
  const history = useHistory();
  const initState = {
    title: "",
    content: ""
  };
  const [value, setValue] = useState(initState);
  const handleOnChange = (e, editor) => {
    const content = editor.getData();
    setValue({ ...value, content });
  };

  const handleOnChangeTitle = e => {
    setValue({
      ...value,
      title: e.target.value
    });
  };
  const handleSubmit = () => {
    addPost(value);
    setValue(initState);
    history.push("/");
  };

  const config = {
    placeholder: "Type the content here!"
  };
  return (
    <EditorContainer>
      <input
        className="title"
        type="text"
        value={value.title}
        onChange={handleOnChangeTitle}
        placeholder="Title"
      />
      <CKEditor
        editor={ClassicEditor}
        onChange={handleOnChange}
        config={config}
      />
      <div className="btnContaner">
        <Button onClick={handleSubmit}>Add Post</Button>
      </div>
    </EditorContainer>
  );
};

const Button = styled(MDBBtn)`
  padding: 0.2em 0.8em;
  margin-top: 2em;
`;

const EditorContainer = styled.div`
  max-width: 1020px;
  margin: 0 auto;
  padding: 2em;

  .title {
    margin-bottom: 0.5em;
  }
  .btnContaner {
    display: flex;
    justify-content: center;
  }

  @media (max-width: 575.98px) {
    margin: 0 auto;
    padding: 1em;
  }
`;
export default connect(null, { addPost })(AddPost);
