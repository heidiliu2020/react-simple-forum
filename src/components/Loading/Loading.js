import React from "react";
import styled from "styled-components";
import { PuffLoader } from "react-spinners";

const LoadingWapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${(props) => props.theme.colors.neutralGrey};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Loading() {
  return (
    <LoadingWapper>
      <PuffLoader size={60} color={"#4A90E2"} />
    </LoadingWapper>
  );
}
