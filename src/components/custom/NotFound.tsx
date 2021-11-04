import styled from "@emotion/styled";
import React, { ReactElement } from "react";

const ErrorDiv = styled.div`
    margin: auto,
    text-align: center,
    margin-top: 10%,
    color: red
  font-size: xxx-large
`;

const NotFount = (): ReactElement => {
  return (
    <ErrorDiv>
      404
      <br />
      The page not fount !
    </ErrorDiv>
  );
};

export default NotFount;
