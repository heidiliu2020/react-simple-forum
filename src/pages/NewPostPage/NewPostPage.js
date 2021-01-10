import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { MEDIA_QUERY } from "../../constants/theme";
import { addNewPost } from "../../WebAPI";
import { LoadingContext } from "../../contexts";

const NewPostWrapper = styled.div`
  padding: 80px 60px;

  ${MEDIA_QUERY} {
    padding: 50px 20px;
  }
`;

const NewPostForm = styled.form`
  max-width: 700px;
  margin: 0 auto;
  padding: 40px 60px;
  box-shadow: 0px 2px 12px ${(props) => props.theme.colors.neutralGrey};
  border-radius: 10px;
  background: ${(props) => props.theme.colors.mainBackground};
  font-size: ${(props) => props.theme.fontSize.h5};

  ${MEDIA_QUERY} {
    padding: 20px 30px;
  }
`;
const NewPostLabel = styled.div`
  margin: 10px 0;
  font-size: ${(props) => props.theme.fontSize.h4};
`;

const NewPostTitleInput = styled.input`
  width: 100%;
  padding: 8px;
  font-size: ${(props) => props.theme.fontSize.h5};
  border: 1px solid ${(props) => props.theme.colors.neutralPaleGrey};
  letter-spacing: 1.5px;
`;

const NewPostImage = styled.input`
  padding: 8px;
  flex: 1;
  font-size: ${(props) => props.theme.fontSize.body};
`;

const PreviewImage = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;

  img {
    width: 240px;
    height: 180px;
    margin-right: 50px;
    border-radius: 6px;
    ${(props) =>
      props.value
        ? `background:transparent`
        : `background:url(https://ddo0fzhfvians.cloudfront.net/uploads/icons/png/17409946451553073813-512.png) center/cover`};
  }

  ${MEDIA_QUERY} {
    flex-direction: column;
    justify-content: center;

    img {
      margin: 0;
    }
  }
`;

const NewPostTextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid ${(props) => props.theme.colors.neutralPaleGrey};
  font-size: ${(props) => props.theme.fontSize.h5};
  letter-spacing: 1.5px;
`;

const NewPostSubmit = styled.div`
  margin-top: 16px;
  text-align: center;

  button {
    color: ${(props) => props.theme.colors.neutralSnow};
    background-color: ${(props) => props.theme.colors.neutralGrey};
    font-size: ${(props) => props.theme.fontSize.button};
    padding: 6px 16px;
    border-radius: 20px;
    border: 1px solid ${(props) => props.theme.colors.neutralGrey};
  }
`;

const ErrorMessage = styled.div`
  color: ${(props) => props.theme.colors.uiNegative};
  font-weight: 700;
`;

const NewPostLoading = styled.div`
  font-weight: 700;
  color: ${(props) => props.theme.colors.neutralGrey};
  padding: 9px;
`;

export default function NewPostPage() {
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const history = useHistory();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleImageChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleInputFocus = () => {
    setErrorMessage(null);
  };

  const handleTextareaFocus = () => {
    setErrorMessage(null);
  };

  const handleNewPostSubmit = (e) => {
    // 阻止預設的表單發送行為
    e.preventDefault();
    setIsLoading(true);
    if (!imageUrl) {
      setImageUrl(
        "https://images.unsplash.com/photo-1586275381277-ef645628e280?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80"
      );
    }
    addNewPost(title, imageUrl, body)
      .then((data) => {
        setIsLoading(false);
        if (data.ok === 0) {
          setErrorMessage(data.message);
          return;
        }
        history.push("/");
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };

  return (
    <NewPostWrapper>
      <NewPostForm onSubmit={handleNewPostSubmit}>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <NewPostLabel>文章標題</NewPostLabel>
        <NewPostTitleInput
          value={title}
          onChange={handleTitleChange}
          onFocus={handleInputFocus}
        />
        <NewPostLabel>文章內容</NewPostLabel>
        <NewPostTextArea
          value={body}
          onChange={handleBodyChange}
          onFocus={handleTextareaFocus}
          rows={14}
        />
        <NewPostLabel>上傳封面</NewPostLabel>
        <PreviewImage>
          <img src={imageUrl} alt="預覽圖片"></img>
          <NewPostImage
            type="text"
            value={imageUrl}
            placeholder="請輸入圖片網址"
            onChange={(e) => handleImageChange(e)}
          ></NewPostImage>
        </PreviewImage>
        <NewPostSubmit>
          {isLoading ? (
            <NewPostLoading>發布中...</NewPostLoading>
          ) : (
            <button>發布</button>
          )}
        </NewPostSubmit>
      </NewPostForm>
    </NewPostWrapper>
  );
}
