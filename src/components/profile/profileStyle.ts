import styled from "@emotion/styled";

// HINT: it is better to avoid tags names in styled component's name for better abstraction.

export const CardDiv = styled.div`
  position: relative;
  width: 340px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.15);
  padding: 16px;
  margin: 56px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CardInnerDiv = styled.div`
  position: relative;
  background-color: rgb(227 239 238);
  border-radius: 4px;
  width: 100%;
  padding: 10px;
  margin: 10px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CardImageDiv = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 15px 35px -15px rgba(0, 0, 0, 0.5),
    0 5px 20px 0 rgba(0, 0, 0, 0.1);

  & > img {
    width: 100%;
    transform: scale(1.2);
  }
`;

export const NameP = styled.p`
  margin-top: 80px;
  font-size: 1.4em;
  color: #333;
  font-weight: bold;
  letter-spacing: 0.8px;
  margin-bottom: 8px;
  text-align: center;
`;

export const EpisodeSpan = styled.span`
  color: steelblue;
  cursor: pointer;
  margin-left: 10px;
`;

export const GeneralP = styled.p`
  line-height: 24px;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
  text-align: center;
`;

export const DetailedBoxDiv = styled.div`
  background-color: rgb(192 225 222);
  border-radius: 8px;
  width: 100%;
  box-shadow: 0 8px 8px 0 rgba(122, 218, 221, 0.15);
  padding: 10px;
  margin: 10px 10px;
`;
