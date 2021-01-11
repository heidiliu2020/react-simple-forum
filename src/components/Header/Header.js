import React, { useContext } from "react";
import styled from "styled-components";
import { Link, NavLink, useHistory, useLocation } from "react-router-dom";

import { AuthContext, LoadingContext } from "../../contexts";
import { setAuthToken, scrollToAnchor } from "../../utils";
import { MEDIA_QUERY } from "../../constants/theme";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 40px;
  box-shadow: 2px 5px 10px ${(props) => props.theme.colors.neutralLightGrey};
  background: ${(props) => props.theme.colors.neutralBrown};
  opacity: 0.95;

  ${MEDIA_QUERY} {
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    padding: 12px 20px;
  }
`;

const Brand = styled.div`
  font-size: ${(props) => props.theme.fontSize.brand};
  white-space: nowrap;
  font-weight: 700;

  a {
    color: ${(props) => props.theme.colors.neutralSnow};
    padding: 8px;

    :hover {
      color: ${(props) => props.theme.colors.neutralWhite};
    }
  }

  ${MEDIA_QUERY} {
    font-size: ${(props) => props.theme.fontSize.h2};
    padding: 6px 0;
  }
`;

const NavbarList = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  font-weight: 700;

  ${MEDIA_QUERY} {
    font-size: ${(props) => props.theme.fontSize.h3};
    justify-content: space-evenly;
  }

  div {
    cursor: pointer;
    width: 86px;
    padding: 6px 0;
    margin: 0 6px;
    text-align: center;
    color: ${(props) => props.theme.colors.neutralSnow};
    border-bottom: 3px solid transparent;
    transition: ease-in-out all 0.3s;

    :hover {
      border-bottom: 3px solid ${(props) => props.theme.colors.mainPrimary};
      color: ${(props) => props.theme.colors.mainPrimary};
    }

    &.${(props) => props.activeClassName} {
      border-bottom: 3px solid ${(props) => props.theme.colors.mainPrimary};
      color: ${(props) => props.theme.colors.mainPrimary};
    }

    /* RWD */
    ${MEDIA_QUERY} {
      font-size: ${(props) => props.theme.fontSize.h5};
      margin: 0;

      &.${(props) => props.activeClassName} {
        color: ${(props) => props.theme.colors.mainPrimary};
      }
    }
  }
`;

const StyledLink = styled(NavLink)`
  width: 86px;
  padding: 6px 0;
  margin: 0 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.neutralSnow};
  border-bottom: 3px solid transparent;
  transition: ease-in-out all 0.3s;

  :hover {
    border-bottom: 3px solid ${(props) => props.theme.colors.mainPrimary};
    color: ${(props) => props.theme.colors.mainPrimary};
  }

  &.${(props) => props.activeClassName} {
    border-bottom: 3px solid ${(props) => props.theme.colors.mainPrimary};
    color: ${(props) => props.theme.colors.mainPrimary};
  }

  /* RWD */
  ${MEDIA_QUERY} {
    font-size: ${(props) => props.theme.fontSize.h5};
    margin: 0;

    &.${(props) => props.activeClassName} {
      color: ${(props) => props.theme.colors.mainPrimary};
    }
  }
`;

const LoadingGetMe = styled.div`
  min-width: 184px;
  padding: 6px 0;
  margin: 0 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.neutralSnow};

  ${MEDIA_QUERY} {
    font-size: ${(props) => props.theme.fontSize.h5};
    margin: 0;
  }
`;

export default function Header() {
  const { isLoadingGetMe } = useContext(LoadingContext);
  const { user, setUser } = useContext(AuthContext);
  const location = useLocation();
  const history = useHistory();

  const handleLogout = () => {
    setAuthToken("");
    setUser(null);
    if (location.pathname !== "/") {
      history.push("/");
    }
  };

  return (
    <HeaderContainer id="page-top">
      <Brand>
        <Link exact to="/" replace>
          Succulents Society.
        </Link>
      </Brand>
      <NavbarList>
        {location.pathname !== "/" ? (
          <StyledLink exact to="/" onClick={() => scrollToAnchor("about-top")}>
            回到首頁
          </StyledLink>
        ) : (
          <StyledLink
            exact
            to="/#about-top"
            onClick={() => scrollToAnchor("about-top")}
          >
            關於本站
          </StyledLink>
        )}

        <StyledLink exact to="/post-list" replace activeClassName="active">
          文章列表
        </StyledLink>
        {isLoadingGetMe ? (
          <LoadingGetMe>資料讀取中...</LoadingGetMe>
        ) : (
          <>
            {!user && (
              <StyledLink exact to="/register" replace activeClassName="active">
                註冊
              </StyledLink>
            )}
            {!user && (
              <StyledLink exact to="/login" replace activeClassName="active">
                登入
              </StyledLink>
            )}
            {user && (
              <StyledLink exact to="/new-post" replace activeClassName="active">
                發布文章
              </StyledLink>
            )}
            {user && (
              <StyledLink to="" replace onClick={handleLogout}>
                登出
              </StyledLink>
            )}
          </>
        )}
      </NavbarList>
    </HeaderContainer>
  );
}
