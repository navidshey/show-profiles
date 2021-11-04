import spinner from "./spinner.gif";
import styled from "@emotion/styled";
import React from "react";

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

const Spinner = () => {
  return (
    <SpinnerDiv>
      <SpinnerImage src={spinner} className="spinner" alt="Loading ..." />
    </SpinnerDiv>
  );
};

export default Spinner;
