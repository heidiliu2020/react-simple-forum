import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";

import { MEDIA_QUERY } from "../../constants/theme";
import { editPost, getPost } from "../../WebAPI";
import { LoadingContext } from "../../contexts";

const EditPostWrapper = styled.div`
  padding: 80px 60px;

  ${MEDIA_QUERY} {
    padding: 50px 20px;
  }
`;

const EditPostForm = styled.form`
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
const EditPostLabel = styled.div`
  margin: 10px 0;
  font-size: ${(props) => props.theme.fontSize.h4};
`;

const EditPostTitleInput = styled.input`
  width: 100%;
  padding: 8px;
  font-size: ${(props) => props.theme.fontSize.h5};
  border: 1px solid ${(props) => props.theme.colors.neutralPaleGrey};
  letter-spacing: 1.5px;
`;

const NewPostImage = styled.input`
  padding: 8px;
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

const EditPostTextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid ${(props) => props.theme.colors.neutralPaleGrey};
  font-size: ${(props) => props.theme.fontSize.h5};
  letter-spacing: 1.5px;
`;

const EditPostSubmit = styled.div`
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

const EditPostLoading = styled.div`
  font-weight: 700;
  color: ${(props) => props.theme.colors.neutralGrey};
  padding: 9px;
`;

export default function EditPostPage() {
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [body, setBody] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getPost(id)
      .then((post) => {
        setTitle(post[0].title);
        setImageUrl(post[0].image);
        setBody(post[0].body);
      })
      .then(() => setIsLoading(false));
  }, [setIsLoading]);

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

  const handleEditPostSubmit = (e) => {
    // 阻止預設的表單發送行為
    e.preventDefault();
    setIsLoading(true);
    editPost(id, title, imageUrl, body)
      .then((data) => {
        setIsLoading(false);
        if (data.ok === 0) {
          setErrorMessage(data.message);
          return;
        }
        history.push("/post-list");
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };

  return (
    <EditPostWrapper>
      <EditPostForm onSubmit={handleEditPostSubmit}>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <EditPostLabel>文章標題</EditPostLabel>
        <EditPostTitleInput
          value={title}
          onChange={handleTitleChange}
          onFocus={handleInputFocus}
        />
        <EditPostLabel>文章內容</EditPostLabel>
        <EditPostTextArea
          value={body}
          onChange={handleBodyChange}
          onFocus={handleTextareaFocus}
          rows={14}
        />
        <EditPostLabel>上傳圖片</EditPostLabel>
        <PreviewImage>
          <img src={imageUrl} alt="預覽圖片"></img>
          <NewPostImage
            type="text"
            value={imageUrl}
            placeholder="請輸入圖片網址"
            onChange={(e) => handleImageChange(e)}
          ></NewPostImage>
        </PreviewImage>
        <EditPostSubmit>
          {isLoading ? (
            <EditPostLoading>編輯中...</EditPostLoading>
          ) : (
            <button>編輯</button>
          )}
        </EditPostSubmit>
      </EditPostForm>
    </EditPostWrapper>
  );
}
