import spinner from "./spinner.gif";
import styled from "@emotion/styled";
import React, { ReactElement } from "react";

const Spinner = (): ReactElement => {
  return (
    <SpinnerDiv>
      <SpinnerImage src={spinner} alt="Loading ..." />
    </SpinnerDiv>
  );
};

export default Spinner;

const SpinnerDiv = styled.div`
  margin: 0% auto 0 auto;
  height: 100%;
  width: auto;
  text-align: center;
`;
const SpinnerImage = styled.img`
  width: "500px";
  margin: "auto";
  display: "block";
`;
