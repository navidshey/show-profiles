import React, { ReactElement } from "react";
import ProfileLocation from "../../api/location/location";
import { DetailedBox, General } from "./profileStyle";

export type Props = {
  isLoading: boolean;
  data?: ProfileLocation;
};

const ProfileCardDetail = ({ isLoading, data }: Props): ReactElement => {
  return (
    <>
      {isLoading && <General> ... </General>}
      {!isLoading && data && (
        <DetailedBox data-testid="details-box">
          {data.dimension && (
            <General>{`Dimension: ${data.dimension}`}</General>
          )}
          <General>{`ResidenceNo: ${data.residents.length}`}</General>
          <General>{`Type: ${data.type}`}</General>
        </DetailedBox>
      )}
      {!isLoading && !data && <General> Error in loading data! </General>}
    </>
  );
};
export default ProfileCardDetail;
