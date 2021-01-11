import React from "react";
import styled from "styled-components";
import { FaGithub } from "react-icons/fa";

import { MEDIA_QUERY } from "../../constants/theme";

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 14px 60px;
  letter-spacing: 1.1px;
  line-height: 1.5;
  background: ${(props) => props.theme.colors.neutralDarkGrey};
  color: ${(props) => props.theme.colors.neutralSnow};

  ${MEDIA_QUERY} {
    display: block;
    text-align: center;
    padding: 8px 20px;
  }
`;

const CopyRight = styled.div`
  display: flex;
  span {
    margin: 0 10px;
  }

  a {
    display: flex;
    align-items: center;
  }
  ${MEDIA_QUERY} {
    justify-content: center;
  }
`;

const GithubIcon = styled(FaGithub)`
  width: 24px;
  height: 24px;
  color: ${(props) => props.theme.colors.neutralSnow};

  :hover {
    color: ${(props) => props.theme.colors.neutralWhite};
  }
`;

export default function Footer() {
  return (
    <FooterContainer>
      <p>※ 本站僅供測試使用，請勿留下真實資訊</p>
      <CopyRight>
        <p>Copyright © 2020</p>
        <span>{" ♥ "}Powered by React.js</span>
        <a
          href="https://github.com/heidiliu2020"
          target="_blank"
          rel="noreferrer nofollow"
        >
          <GithubIcon></GithubIcon>
        </a>
      </CopyRight>
    </FooterContainer>
  );
}
