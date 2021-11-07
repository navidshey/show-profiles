import React, { ReactElement } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { PaginationInfo } from "./../../../api/profile/profile";

const Pagination = ({
  prev,
  next,
  pages,
  count,
}: PaginationInfo): ReactElement => {
  const createRoute = (url: string) =>
    `/${url.substr(url.lastIndexOf("=") + 1)}`;

  const currentPage = next
    ? +next.substr(next.lastIndexOf("=") + 1) - 1
    : prev
    ? +prev.substr(prev.lastIndexOf("=") + 1) + 1
    : 1;

  return (
    <BaseDiv>
      <PaginationDiv>
        {prev && (
          <>
            {" "}
            <PageLink to="/">1</PageLink> <DotSpan> ... </DotSpan>{" "}
          </>
        )}
        {prev && currentPage != 2 && (
          <PageLink to={createRoute(prev)}>{currentPage - 1}</PageLink>
        )}
        <ActiveLink to="#">{currentPage}</ActiveLink>
        {next && currentPage != pages - 1 && (
          <PageLink to={createRoute(next)}>{currentPage + 1}</PageLink>
        )}
        {next && (
          <>
            {" "}
            <DotSpan> ... </DotSpan>
            <PageLink to={`/${pages}`}>{pages}</PageLink>
          </>
        )}
        <CharacterCountSpan>{count} Characters</CharacterCountSpan>
      </PaginationDiv>
    </BaseDiv>
  );
};

export default Pagination;

const activeColor = "#4CAF50";

const BaseDiv = styled.div`
  text-align: center;
  flex-basis: 100%;
`;

const PaginationDiv = styled.div`
  display: inline-block;
  width: 520px;
  background-color: #fff;
  border-radius: 5px;
  padding: 16px;
  justify-content: center;
  align-items: center;
  @media (max-width: 540px) {
    width: 90%;
  }
`;

const PageLink = styled(Link)`
  color: black;
  float: left;
  padding: 8px 12px;
  text-decoration: none;
  transition: background-color 0.3s;
  border: 1px solid #ddd;
  margin: 0 4px;
  &:hover {
    background-color: ${activeColor};
    color: white;
    cursor: pointer;
    border: 1px solid ${activeColor};
  }
`;

const ActiveLink = styled(Link)`
  color: black;
  float: left;
  padding: 8px 12px;
  text-decoration: none;
  transition: background-color 0.3s;
  border: 1px solid #ddd;
  margin: 0 4px;
  background-color: ${activeColor};
  color: white;
  border: 1px solid ${activeColor};
`;

const DotSpan = styled.span`
  float: left;
  padding: 0 10px 0 10px;
  font-size: larger;
`;

const CharacterCountSpan = styled.span`
  float: right;
  padding: 10px 10px 0 10px;
  font-size: medium;
`;
