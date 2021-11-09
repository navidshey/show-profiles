import React, { ReactElement } from "react";
import ProfileLocation from "../../api/location/location";
import { DetailedBox, General } from "./profileStyle";
import Reload from "./../custom/Reload";

export type Props = {
  isLoading: boolean;
  data?: ProfileLocation;
  callBack: () => void;
};

const ProfileCardDetail = ({
  isLoading,
  data,
  callBack,
}: Props): ReactElement => {
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
      {!isLoading && !data && (
        <Reload
          errorMessage="Error in loading data!"
          callBackFunction={callBack}
        />
      )}
    </>
  );
};
export default ProfileCardDetail;
