import React, { ReactElement } from "react";
import ProfileLocation from "./../../api/location/location";
import "./profile.css";
const ProfileCardRow = ({
  isLoading,
  data,
}: {
  isLoading: boolean;
  data: ProfileLocation | undefined;
}): ReactElement => {
  return (
    <>
      {isLoading && <p> ... </p>}
      {!isLoading && data && data.dimension && (
        <div className="details-box">
          <p>{`Dimension: ${data.dimension}`}</p>
          <p>{`ResidenceNo: ${data.residents.length}`}</p>
          <p>{`Type: ${data.type}`}</p>
        </div>
      )}
      {!isLoading && !data && <p> Error in loading data! </p>}
    </>
  );
};
export default ProfileCardRow;
