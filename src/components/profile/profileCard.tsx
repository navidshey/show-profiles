// FIXME: some files named in camelCase, some in PascalCase. Naming should follow the same system in the whole project.
import React, { useState, ReactElement } from "react";
import { Character } from "../../api/profile/profile";
import { getLocations } from "./../../api/location/locationApi";
import ProfileLocation from "../../api/location/location";
import { getEpisodeNames } from "../../api/episode/episodeApi";
import ProfileCardRow from "./profileCardRow";
// HINT: styled components can be imported as `import * as Styled from './profileStyle';`
// It helps you to avoid naming conflicts and makes JSX more expressive.
import {
  CardDiv,
  CardImageDiv,
  CardInnerDiv,
  EpisodeSpan,
  GeneralP,
  NameP,
} from "./profileStyle";

export type Props = {
  character: Character;
};
type locationsStateType =
  | {
      location?: ProfileLocation;
      origin?: ProfileLocation;
    }
  | undefined;

const ProfileCard = ({ character }: Props): ReactElement => {
  const [locations, setLocations] = useState<locationsStateType>();
  const [episodeNames, setEpisodeNames] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [episodeLoading, setEpisodeLoading] = useState<boolean>(false);

  const fetchEpisodes = async () => {
    const episodesId = character.episode
      .map((episode) => episode.substr(episode.lastIndexOf("/") + 1))
      .join(",");
    setEpisodeLoading(true);
    const episodes = await getEpisodeNames(episodesId);
    setEpisodeNames(episodes);
    setEpisodeLoading(false);
  };

  const fetchLocations = async () => {
    setIsLoading(true);
    const locationId = character.location.url.substr(
      character.location.url.lastIndexOf("/") + 1
    );
    const originId = character.origin.url.substr(
      character.origin.url.lastIndexOf("/") + 1
    );
    setIsLoading(true);
    getLocations(`${locationId},${originId}`).then((result) => {
      setLocations({
        location: result?.find((location) => location.id === +locationId),
        origin: result?.find((location) => location.id === +originId),
      });
      setIsLoading(false);
    });
  };

  return (
    <CardDiv>
      <CardImageDiv>
        <img src={character.image} alt={character.name} />
      </CardImageDiv>
      <NameP>{`${character.name} (${character.gender})`}</NameP>
      <GeneralP>{`${character.species} (${character.status})`}</GeneralP>
      <GeneralP>
        {`Episode Numbers: ${character.episode.length}`}
        {!episodeNames && (
          <EpisodeSpan onClick={fetchEpisodes}>(Show Names)</EpisodeSpan>
        )}
      </GeneralP>
      {episodeLoading && <GeneralP>...</GeneralP>}
      {!episodeLoading && episodeNames && (
        <CardInnerDiv> {episodeNames} </CardInnerDiv>
        // <p className="card-inner"> {episodeNames} </p>
      )}

      <CardInnerDiv>
        <GeneralP>{`Location: ${character.location.name}`}</GeneralP>
        {(isLoading || locations) && (
          <ProfileCardRow isLoading={isLoading} data={locations?.location} />
        )}
        <GeneralP>{`Origin: ${character.origin.name}`}</GeneralP>
        {(isLoading || locations) && (
          <ProfileCardRow isLoading={isLoading} data={locations?.origin} />
        )}
        {!locations && (
          <EpisodeSpan onClick={fetchLocations}>(Show Details)</EpisodeSpan>
        )}
      </CardInnerDiv>
    </CardDiv>
  );
};
export default ProfileCard;
