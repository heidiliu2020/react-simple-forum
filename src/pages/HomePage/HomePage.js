import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaAngleDoubleRight } from "react-icons/fa";

import { MEDIA_QUERY } from "../../constants/theme";
import { getLimitPosts } from "../../WebAPI";
import { LoadingContext } from "../../contexts";
import Loading from "../../components/Loading";
import Banner from "../../components/Banner";
import AboutPage from "../AboutPage";

const HomePageWrapper = styled.div`
  background: ${(props) => props.theme.colors.neutralWhite};
`;

const PostsListContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 30px;
  border-top: 1px solid ${(props) => props.theme.colors.neutralPaleGrey};

  section {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }

  ${MEDIA_QUERY} {
    flex-direction: column;
    padding: 40px 20px;
  }
`;

const PostsListTitle = styled.div`
  display: inline-block;
  font-size: ${(props) => props.theme.fontSize.h1};
  font-weight: 700;
  color: ${(props) => props.theme.colors.neutralWhite};
  background: ${(props) => props.theme.colors.neutralBrown};
  margin: 50px 0;
  padding: 16px 80px 60px 20px;
  opacity: 0.8;
`;

const AboutTitle = styled(PostsListTitle)`
  margin: 80px 0 0 0;
`;

const BackgroundClip = styled.div`
  position: absolute;
  font-size: 250px;
  transform: rotate(-90deg);
  color: ${(props) => props.theme.colors.mainPrimary};
  opacity: 0.3;
  top: 1160px;
  left: -350px;
  z-index: 1;

  ${MEDIA_QUERY} {
    font-size: 200px;
    right: 10px;
  }
`;

const PostContainer = styled.div`
  margin: 30px;
  width: 300px;
  overflow: hidden;
  border-radius: 6px;
  box-shadow: 2px 5px 10px ${(props) => props.theme.colors.neutralLightGrey};
  background: ${(props) => props.theme.colors.neutralBrown};
  color: ${(props) => props.theme.colors.neutralWhite};
  opacity: 0.95;
  position: relative;
  z-index: 10;

  :hover {
    opacity: 1;
  }
`;

const PostImage = styled.div`
  max-width: 100%;
  height: 250px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
`;

const PostTitle = styled.div`
  font-size: ${(props) => props.theme.fontSize.h3};
  color: ${(props) => props.theme.colors.neutralWhite};
  line-height: 1.2;
  padding: 20px;
`;

const PostPreview = styled.div`
  width: 100%;
  height: 100%;
  padding: 24px;
  background: ${(props) => props.theme.colors.neutralGrey};
  display: none;

  div {
    font-size: ${(props) => props.theme.fontSize.h3};
    color: ${(props) => props.theme.colors.neutralSnow};
    letter-spacing: 3px;
    line-height: 1.5;
    /* 省略過長內容 */
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const PostContent = styled(Link)`
  transition: ease-in all 1s;

  :hover {
    ${PostPreview} {
      display: block;
    }
    ${PostImage} {
      transform: scale(1.1);
      transition: ease-in-out all 0.5s;
    }
  }
`;

const ReadMoreContainer = styled.div`
  font-size: ${(props) => props.theme.fontSize.h3};
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  margin: 20px 0;

  a {
    color: ${(props) => props.theme.colors.neutralSnow};
    background: ${(props) => props.theme.colors.neutralLightGrey};
    padding: 16px;
    border-radius: 4px;

    div {
      display: flex;
      align-items: center;
    }

    :hover {
      color: ${(props) => props.theme.colors.neutralWhite};
      background: ${(props) => props.theme.colors.mainPrimary};
    }
  }

  ${MEDIA_QUERY} {
    justify-content: center;
  }
`;

const RightIcon = styled(FaAngleDoubleRight)`
  width: 40px;
  height: 40px;
  margin-left: 10px;
`;

function PostList({ post }) {
  return (
    <PostContainer>
      <PostContent to={`/post/${post.id}`}>
        <PostImage style={{ backgroundImage: `url(${post.image})` }}>
          <PostPreview>
            <div>{post.body}</div>
          </PostPreview>
        </PostImage>
        <PostTitle>{post.title}</PostTitle>
      </PostContent>
    </PostContainer>
  );
}

PostList.propTypes = {
  post: PropTypes.object,
};

export default function HomePage() {
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getLimitPosts(1, 6)
      .then((posts) => setPosts(posts))
      .then(() => {
        setIsLoading(false);
      });
  }, [setIsLoading]);

  return (
    <HomePageWrapper>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Banner />
          <PostsListTitle>
            <div>多肉討論區</div>
          </PostsListTitle>
          <BackgroundClip>Succulents</BackgroundClip>
          <PostsListContainer>
            <section>
              {posts &&
                posts.map((post) => <PostList post={post} key={post.id} />)}
            </section>
            <ReadMoreContainer>
              <Link to="/post-list">
                <div>
                  查看更多<RightIcon></RightIcon>
                </div>
              </Link>
            </ReadMoreContainer>
          </PostsListContainer>
          <AboutTitle>
            <div>關於本站</div>
          </AboutTitle>
          <AboutPage />
        </>
      )}
    </HomePageWrapper>
  );
}
