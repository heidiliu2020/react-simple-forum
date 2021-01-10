import React from "react";
import styled from "styled-components";

import { MEDIA_QUERY } from "../../constants/theme";
import bg from "../../components/images/bg_3.jpg";

const AboutWrapper = styled.div`
  height: 550px;
  background: url(${bg}) scroll no-repeat center / cover;
  margin-top: 50px;
  padding: 40px;
  text-align: center;
  box-shadow: 2px 2px 2px ${(props) => props.theme.colors.neutralGrey};

  ${MEDIA_QUERY} {
    padding: 40px 20px;
  }
`;

const AboutTitle = styled.h2`
  text-align: center;
  font-size: ${(props) => props.theme.fontSize.h1};
  font-weight: 700;
  margin-bottom: 20px;
`;

const AboutContent = styled.div`
  line-height: 2;
  font-size: ${(props) => props.theme.fontSize.h4};

  b {
    font-weight: 700;
  }
`;

export default function AboutPage() {
  return (
    <AboutWrapper id="about-top">
      <AboutTitle>關於 SS</AboutTitle>
      <AboutContent>
        <p>Succulents Society 存在的目的，是為了讓更多人感受多肉的魅力。</p>
        <p>深信分享會讓世界變得更加美好。</p>
      </AboutContent>
    </AboutWrapper>
  );
}
