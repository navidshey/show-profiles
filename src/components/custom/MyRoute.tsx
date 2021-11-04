import { Route, Switch } from "react-router-dom";
import React, { ReactElement } from "react";
const Profiles = React.lazy(() => import("../profile/Profiles"));
const NotFound = React.lazy(() => import("./NotFound"));

interface RouteType {
  exact: boolean;
  path: string;
  component: any;
}

/**
 * The routing of the application will handle here.
 * we have an array of needed properties for @MyRoute Component.
 * @param exact determines that a Route should considered exact route or not
 * @param path determines the path of the screen component
 * @param component determines the name of the component that we are defining its route
 */
const routes: RouteType[] = [
  {
    exact: true,
    path: "/:page?",
    component: Profiles,
  },
  {
    exact: false,
    path: "*",
    component: NotFound,
  },
];

/**
 * The component that routing of the whole application is set inside it
 * while adding another screen component which needs routing we have to set it to {@link routes} array inside the component
 */
const MyRoute = (): ReactElement => {
  return (
    <Switch>
      {routes.map((route) => (
        <Route {...route} />
      ))}
    </Switch>
  );
};

export default MyRoute;
