import React, { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";

import { MEDIA_QUERY } from "../../constants/theme";
import { getPosts, getLimitPosts, deletePost } from "../../WebAPI";
import { getPages } from "../../utils";
import Pagination from "../../components/Pagination";
import { LoadingContext, AuthContext } from "../../contexts";
import Loading from "../../components/Loading";

const PostListWrapper = styled.div`
  min-height: 100vh;
  padding: 100px 30px;

  ${MEDIA_QUERY} {
    padding: 40px 10px;
  }
`;

const PostsListContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 60px;
  box-shadow: 0px 2px 12px ${(props) => props.theme.colors.neutralGrey};
  border-radius: 10px;
  background: ${(props) => props.theme.colors.mainBackground};

  ${MEDIA_QUERY} {
    padding: 30px;
  }
`;

const PostsListTitle = styled.div`
  font-size: ${(props) => props.theme.fontSize.h1};
  font-weight: 700;
  color: ${(props) => props.theme.colors.neutralDarkGrey};
  border-bottom: 1px solid ${(props) => props.theme.colors.neutralPaleGrey};
  padding-bottom: 10px;
`;

const PostImageContainer = styled.div`
  overflow: hidden;
  border-radius: 4px;
`;

const PostImage = styled.div`
  min-width: 140px;
  height: 140px;
  border-radius: 4px;
  margin-left: 5px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
`;

const PostContainer = styled.div`
  display: block;
  border-bottom: 1px solid ${(props) => props.theme.colors.neutralLightGrey};
  padding: 30px 0;
  font-weight: 700;

  :hover {
    ${PostImage} {
      transition: ease-in-out all 0.5s;
      transform: scale(1.2);
    }
  }

  ${MEDIA_QUERY} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const PostTitle = styled(Link)`
  font-size: ${(props) => props.theme.fontSize.h3};
  color: ${(props) => props.theme.colors.mainPrimary};
  padding-bottom: 10px;
`;

const SettingButton = styled.div`
  display: flex;
`;

const PostDeleteButton = styled.button`
  color: ${(props) => props.theme.colors.neutralWhite};
  background-color: ${(props) => props.theme.colors.uiNegative};
  border: 1px solid transparent;
  border-radius: 20px;
  font-size: ${(props) => props.theme.fontSize.body};
  width: 50px;
  height: 30px;
`;

const PostEditButton = styled(PostDeleteButton)`
  background-color: ${(props) => props.theme.colors.uiPositive};
  margin-right: 8px;
`;

const PostDate = styled.div`
  color: ${(props) => props.theme.colors.neutralGrey};
`;

const PostBody = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PostContent = styled.div`
  font-size: ${(props) => props.theme.fontSize.h4};
  color: ${(props) => props.theme.colors.neutralDarkGrey};
  letter-spacing: 3px;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 530px;
  max-height: 100px;
`;

function PostList({ user, post, handleDeletePost, handleEditPost }) {
  return (
    <PostContainer>
      <PostHeader>
        <PostTitle exact to={`/post/${post.id}`}>
          {post.title}
        </PostTitle>
        {user && (user.username === "admin" || user.id === post.userId) && (
          <SettingButton>
            <PostEditButton
              onClick={() => {
                handleEditPost(post.id);
              }}
            >
              編輯
            </PostEditButton>
            <PostDeleteButton
              onClick={() => {
                handleDeletePost(post.id);
              }}
            >
              刪除
            </PostDeleteButton>
          </SettingButton>
        )}
      </PostHeader>
      <PostDate>{new Date(post.createdAt).toLocaleDateString()}</PostDate>
      <PostBody exact to={`/post/${post.id}`}>
        <PostContent>{post.body}</PostContent>
        <PostImageContainer>
          <PostImage
            style={{ backgroundImage: `url(${post.image})` }}
          ></PostImage>
        </PostImageContainer>
      </PostBody>
    </PostContainer>
  );
}

PostList.propTypes = {
  user: PropTypes.object,
  post: PropTypes.object,
  handleDeletePost: PropTypes.func,
  handleEditPost: PropTypes.func,
};

export default function PostListPage() {
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const { user } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = useRef();
  const limit = 5;
  const history = useHistory();

  useEffect(() => {
    setIsLoading(true);
    getPosts().then((posts) => {
      // 讀取留言來計算總頁數
      totalPages.current = getPages(Math.ceil(posts.length / limit));
      // 讀取第一頁文章
      getLimitPosts(1, limit)
        .then((posts) => setPosts(posts))
        .then(() => {
          setIsLoading(false);
        });
    });
  }, [setIsLoading]);

  const handleDeletePost = (id) => {
    setIsLoading(true);
    deletePost(id)
      .then(() => {
        // 刪除後重新讀取第一頁文章
        getLimitPosts(1, limit).then((posts) => setPosts(posts));
      })
      .catch((err) => {
        console.log(err);
      })
      .then(setIsLoading(false));
  };

  const handleEditPost = (id) => {
    history.push(`/edit-post/${id}`);
  };

  return (
    <PostListWrapper>
      {isLoading ? (
        <Loading />
      ) : (
        <PostsListContainer>
          <PostsListTitle>多肉討論版</PostsListTitle>
          {posts.map((post) => (
            <PostList
              post={post}
              key={post.id}
              user={user}
              handleDeletePost={handleDeletePost}
              handleEditPost={handleEditPost}
            />
          ))}
          <Pagination
            totalPages={totalPages}
            limit={limit}
            setPosts={setPosts}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </PostsListContainer>
      )}
    </PostListWrapper>
  );
}
