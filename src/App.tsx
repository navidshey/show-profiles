import React, { Suspense, ReactElement } from "react";
import MyRoute from "./components/custom/MyRoute";
import Spinner from "./components/custom/Spinner/Spinner";

function App(): ReactElement {
  return (
    <body>
      <Suspense fallback={<Spinner />}>
        <MyRoute></MyRoute>
      </Suspense>
    </body>
  );
}

export default App;
