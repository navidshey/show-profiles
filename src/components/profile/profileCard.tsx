import React, { useEffect, useState, ReactElement } from "react";
import { Character } from "../../api/profile/profile";
import "./profile.css";
import { getLocations } from "./../../api/location/locationApi";
import ProfileLocation from "../../api/location/location";
import { getEpisodeNames } from "../../api/episode/episodeApi";
import ProfileCardRow from "./profileCardRow";

const ProfileCard = ({ character }: { character: Character }): ReactElement => {
  const [locations, setLocations] = useState<
    | {
        location: ProfileLocation | undefined;
        origin: ProfileLocation | undefined;
      }
    | undefined
  >();
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
    <div className="card">
      <div className="card-image">
        <img src={character.image} alt={character.name} />
      </div>
      <p className="name">{`${character.name} (${character.gender})`}</p>
      <p>{`${character.species} (${character.status})`}</p>
      <p>
        {`Episode Numbers: ${character.episode.length}`}
        {!episodeNames && (
          <span className="episode-name" onClick={fetchEpisodes}>
            (Show Names)
          </span>
        )}
      </p>
      {episodeLoading && <p>...</p>}
      {!episodeLoading && episodeNames && (
        <p className="card-inner"> {episodeNames} </p>
      )}

      <div className="card-inner">
        <p>{`Location: ${character.location.name}`}</p>
        {(isLoading || locations) && (
          <ProfileCardRow isLoading={isLoading} data={locations?.location} />
        )}
        <p>{`Origin: ${character.origin.name}`}</p>
        {(isLoading || locations) && (
          <ProfileCardRow isLoading={isLoading} data={locations?.origin} />
        )}
        {!locations && (
          <p className="episode-name" onClick={fetchLocations}>
            (Show Details)
          </p>
        )}
      </div>
    </div>
  );
};
export default ProfileCard;
