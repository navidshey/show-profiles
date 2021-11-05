import { Route, Switch } from "react-router-dom";
import React, { ReactElement } from "react";
const Profiles = React.lazy(() => import("../profile/Profiles"));
const NotFound = React.lazy(() => import("./NotFound"));

/**
 * @param id - id of the route
 * @param exact determines that a Route should considered exact route or not
 * @param path determines the path of the screen component
 * @param component determines the name of the component that we are defining its route
 */
interface RouteType {
  id: string;
  exact: boolean;
  path: string;
  component: React.ComponentType;
}

/** The routing of the application will handle here.
 * we have an array of needed properties for @MyRoute Component.
 */
const routes: RouteType[] = [
  {
    id: "home",
    exact: true,
    path: "/:page?",
    component: Profiles,
  },
  {
    id: "notfound",
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
        <Route key={route.id} {...route} />
      ))}
    </Switch>
  );
};

export default MyRoute;
