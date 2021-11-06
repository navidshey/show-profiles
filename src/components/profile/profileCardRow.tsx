import React, { ReactElement } from "react";
import ProfileLocation from "./../../api/location/location";
import { DetailedBoxDiv, GeneralP } from "./profileStyle";

export type Props = {
  isLoading: boolean;
  data?: ProfileLocation;
};

const ProfileCardRow = ({ isLoading, data }: Props): ReactElement => {
  return (
    <>
      {isLoading && <GeneralP> ... </GeneralP>}
      {!isLoading && data && (
        <DetailedBoxDiv>
          {data.dimension && (
            <GeneralP>{`Dimension: ${data.dimension}`}</GeneralP>
          )}
          <GeneralP>{`ResidenceNo: ${data.residents.length}`}</GeneralP>
          <GeneralP>{`Type: ${data.type}`}</GeneralP>
        </DetailedBoxDiv>
      )}
      {!isLoading && !data && <GeneralP> Error in loading data! </GeneralP>}
    </>
  );
};
export default ProfileCardRow;
