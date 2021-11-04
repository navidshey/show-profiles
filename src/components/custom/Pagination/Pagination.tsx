import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import "./pagination.css";
import { Info } from "./../../../api/profile/profile";

const Pagination = ({
  prop,
  routeName,
}: {
  prop: Info;
  routeName?: string;
}): ReactElement => {
  const firstRoutePart = routeName ? `/${routeName}` : "";
  const createRoute = (url: string) =>
    `${firstRoutePart}/${url.substr(url.lastIndexOf("=") + 1)}`;
  const currentPage = prop.next
    ? +prop.next.substr(prop.next.lastIndexOf("=") + 1) - 1
    : +prop.prev.substr(prop.prev.lastIndexOf("=") + 1) + 1;
  return (
    <div className="center">
      <div className="pagination ">
        {prop.prev && <Link to={createRoute(prop.prev)}>&laquo;</Link>}
        {prop.prev && (
          <Link to={createRoute(prop.prev)}>{currentPage - 1}</Link>
        )}
        <Link to="#" className="active">
          {currentPage}
        </Link>
        {prop.next && (
          <Link to={createRoute(prop.next)}>{currentPage + 1}</Link>
        )}
        {prop.next && <Link to={createRoute(prop.next)}>&raquo;</Link>}
      </div>
    </div>
  );
};

export default Pagination;
