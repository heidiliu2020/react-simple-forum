import React from "react";
import styled from "styled-components";
import Background from "../images/bg_2.jpg";
import { MEDIA_QUERY } from "../../constants/theme";

const BannerContainer = styled.div`
  position: relative;
  height: 400px;
  background: url(${Background}) no-repeat center / cover;

  ${MEDIA_QUERY} {
    height: 320px;
  }
`;

const BannerContent = styled.div`
  position: absolute;
  bottom: -30px;
  right: 100px;
  line-height: 1.2;
  background: ${(props) => props.theme.colors.mainPrimary};
  padding: 12px 50px 40px 12px;
  opacity: 0.8;

  ${MEDIA_QUERY} {
    bottom: -20px;
    right: 40px;
    padding: 10px 40px 30px 10px;
  }
`;

const BannerTitle = styled.div`
  color: ${(props) => props.theme.colors.neutralWhite};
  font-size: ${(props) => props.theme.fontSize.brand};
  font-weight: 700;

  ${MEDIA_QUERY} {
    font-size: ${(props) => props.theme.fontSize.h1};
  }
`;

export default function Banner() {
  return (
    <BannerContainer>
      <BannerContent>
        <BannerTitle>
          <p>無肉令人瘦—— </p>
          <span>不如來點多肉吧！</span>
        </BannerTitle>
      </BannerContent>
    </BannerContainer>
  );
}
