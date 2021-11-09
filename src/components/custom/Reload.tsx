import styled from "@emotion/styled";
import React, { ReactElement } from "react";

type Props = {
  errorMessage: string;
  callBackFunction: () => void;
};
const Reload = ({ errorMessage, callBackFunction }: Props): ReactElement => {
  return (
    <div>
      <ErrorMsg>{errorMessage}</ErrorMsg>
      <ReloadBtn onClick={callBackFunction}> (Reload) </ReloadBtn>
    </div>
  );
};

export default Reload;

const ReloadBtn = styled.span`
  color: steelblue;
  cursor: pointer;
  margin-left: 10px;
`;

const ErrorMsg = styled.p`
  line-height: 18px;
  letter-spacing: 0.5px;
  margin: 0px;
  text-align: center;
  color: red;
`;
