import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { getLimitPosts } from "../../WebAPI";

const Root = styled.div``;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 8px;
  margin-top: 16px;
`;

const PageButton = styled.button`
  border: 1px solid #555;
  border-radius: 50%;
  padding: 8px 12px;
  font-size: 16px;
  outline: transparent;
  cursor: pointer;
  margin-right: 4px;

  background: ${(props) =>
    props.className === "selected"
      ? "rgba(0, 0, 0, 0.5)"
      : "rgba(0, 0, 0, 0.1)"};
  color: ${(props) =>
    props.className === "selected" ? "#eee" : "rgba(0, 0, 0, 0.5)"};

  &:hover {
    background: rgba(0, 0, 0, 0.5);
    color: #eee;
  }
`;

export default function Pagination({
  setPosts,
  limit,
  totalPages,
  currentPage,
  setCurrentPage,
}) {
  const handlePageClick = (page) => {
    getLimitPosts(page, limit).then((posts) => setPosts(posts));
    setCurrentPage(page);
  };

  return (
    <Root>
      <PaginationContainer>
        {totalPages.current &&
          totalPages.current.map((page) => (
            <PageButton
              key={page}
              onClick={() => handlePageClick(page)}
              className={currentPage === page ? "selected" : ""}
            >
              {page}
            </PageButton>
          ))}
      </PaginationContainer>
    </Root>
  );
}

Pagination.propTypes = {
  setPosts: PropTypes.func,
  limit: PropTypes.number,
  totalPages: PropTypes.object,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
};
