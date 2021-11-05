import React, { ReactElement } from "react";
import ProfileLocation from "./../../api/location/location";
import "./profile.css";

export interface CardRowInterface {
  isLoading: boolean;
  data?: ProfileLocation;
}

const ProfileCardRow = ({
  isLoading,
  data,
}: CardRowInterface): ReactElement => {
  return (
    <>
      {isLoading && <p> ... </p>}
      {!isLoading && data && (
        <div className="details-box">
          {data.dimension && <p>{`Dimension: ${data.dimension}`}</p>}
          <p>{`ResidenceNo: ${data.residents.length}`}</p>
          <p>{`Type: ${data.type}`}</p>
        </div>
      )}
      {!isLoading && !data && <p> Error in loading data! </p>}
    </>
  );
};
export default ProfileCardRow;
