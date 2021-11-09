import styled from "@emotion/styled";
import React, { ReactElement } from "react";

type Props = {
  errorMessage: string;
  callBackFunction: () => void;
};

/**Shows the error message and a Reload link to run callback function to reload related component again
 * 
 * @param errorMessage - the error message to show
 * @param callBackFunction - callback function of the related component to reloading component's data
 * @returns 
 */
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
