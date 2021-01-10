import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaChevronUp } from "react-icons/fa";
import styled from "styled-components";

const TOKEN_NAME = "token";

// 存取 token 到 localStorage
export const setAuthToken = (token) => {
  localStorage.setItem(TOKEN_NAME, token);
};

// 從 localStorage 撈取 token
export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_NAME);
};

// 由 totalPages 撈取總頁數
export const getPages = (totalPages) => {
  let pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  return pages;
};

// 回到頂端
export const ClickTop = styled(FaChevronUp)`
  cursor: pointer;
  position: fixed;
  width: 50px;
  height: 50px;
  padding: 10px;
  border-radius: 4px;
  bottom: 80px;
  right: 5%;
  color: ${(props) => props.theme.colors.neutralDarkGrey};
  background: ${(props) => props.theme.colors.neutralSnow};
  transition: ease-in-out 0.3s;
  z-index: 100;

  :hover {
    color: ${(props) => props.theme.colors.neutralSnow};
    background: ${(props) => props.theme.colors.neutralDarkGrey};
  }
`;

// 路徑改變就自動到 TOP
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// 錨點功能
export const scrollToAnchor = (anchorName) => {
  if (anchorName) {
    let anchorElement = document.getElementById(anchorName);
    if (anchorElement) {
      anchorElement.scrollIntoView();
    }
  }
};
