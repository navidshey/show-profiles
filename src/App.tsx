import React, { Suspense, ReactElement } from "react";
import MyRoute from "./components/custom/MyRoute";
import Spinner from "./components/custom/Spinner/Spinner";
import styled from "@emotion/styled";

function App(): ReactElement {
  return (
    <Body>
      <Suspense fallback={<Spinner />}>
        <MyRoute></MyRoute>
      </Suspense>
    </Body>
  );
}

export default App;

const Body = styled.body`
  min-height: 100vh;
  width: 100%;
  background-color: #e4e4e4;
  display: flex;
  /* Responsive behaviour */
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 40px 16px;
  @media (max-width: 720px) {
    padding: 40px 0px;
  }
`;
