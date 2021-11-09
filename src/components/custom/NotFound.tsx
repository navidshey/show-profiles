import styled from "@emotion/styled";
import React, { ReactElement } from "react";
/**
 * @returns Is the component when the page not found, shows the error
 */
const NotFount = (): ReactElement => {
  return (
    <ErrorDiv>
      404
      <br />
      The page not found !
    </ErrorDiv>
  );
};

export default NotFount;

const ErrorDiv = styled.div`
  margin: auto;
  text-align: center;
  margin-top: 10%;
  color: red;
  font-size: xxx-large;
`;
