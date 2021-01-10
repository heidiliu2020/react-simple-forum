import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import { MEDIA_QUERY } from "../../constants/theme";
import { getPost } from "../../WebAPI";
import { LoadingContext } from "../../contexts";
import Loading from "../../components/Loading";

const PostWrapper = styled.div`
  padding: 100px 20px 300px 20px;

  ${MEDIA_QUERY} {
    padding: 100px 20px;
  }
`;

const PostContainer = styled.div`
  max-width: 900px;
  padding: 60px;
  margin: 0 auto;
  box-shadow: 0px 2px 12px ${(props) => props.theme.colors.neutralGrey};
  border-radius: 6px;
  background: ${(props) => props.theme.colors.mainBackground};

  ${MEDIA_QUERY} {
    padding: 40px 20px;
  }
`;

const PostTitle = styled.div`
  font-size: ${(props) => props.theme.fontSize.postTitle};
  font-weight: 700;
`;

const PostHeader = styled.div`
  margin: 16px 0;
  padding: 8px 0;
  border-top: 1px solid ${(props) => props.theme.colors.neutralLightGrey};
  font-size: ${(props) => props.theme.fontSize.h5};
  color: ${(props) => props.theme.colors.neutralGrey};
  & div {
    margin-top: 8px;
  }
`;

const PostAuthor = styled.div``;

const PostDate = styled.div``;

const PostImage = styled.div`
  max-width: 100%;
  height: 300px;
  border-radius: 4px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
`;

const PostBody = styled.div`
  font-size: ${(props) => props.theme.fontSize.h4};
  letter-spacing: 3px;
  line-height: 1.5;
  word-break: break-all;
  white-space: pre-line;
  margin-top: 20px;
`;

export default function PostPage() {
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getPost(id)
      .then((post) => setPost(post[0]))
      .then(() => setIsLoading(false));
  }, [setIsLoading]);

  return (
    <PostWrapper>
      {isLoading ? (
        <Loading />
      ) : (
        <PostContainer>
          {/* post &&: 確認陣列裡面有東西才會執行 */}
          <PostTitle>{post && post.title}</PostTitle>
          <PostHeader>
            <PostAuthor>作者：{post && post.user.username}</PostAuthor>
            <PostDate>
              時間：{post && new Date(post.createdAt).toLocaleString()}
            </PostDate>
          </PostHeader>
          <PostImage
            style={{ backgroundImage: `url(${post && post.image})` }}
          ></PostImage>
          <PostBody>{post && post.body}</PostBody>
        </PostContainer>
      )}
    </PostWrapper>
  );
}
