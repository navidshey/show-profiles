import React, { useEffect, useState, ReactElement } from "react";
import { Character } from "../../api/profile/profile";
import "./profile.css";
import { getLocations } from "./../../api/location/locationApi";
import ProfileLocation from "../../api/location/location";
import { getEpisodeNames } from "../../api/episode/episodeApi";

const ProfileCard = ({ character }: { character: Character }): ReactElement => {
  const [location, setLocation] = useState<ProfileLocation | undefined>();
  const [origin, setOrigin] = useState<ProfileLocation | undefined>();
  const [episodeNames, setEpisodeNames] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [episodeLoading, setEpisodeLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const locationId = character.location.url.substr(
      character.location.url.lastIndexOf("/") + 1
    );
    const originId = character.origin.url.substr(
      character.origin.url.lastIndexOf("/") + 1
    );
    if (locationId || originId) {
      setIsLoading(true);
      getLocations(`${locationId},${originId}`).then((result) => {
        console.log(
          `location: ${locationId}, origin: ${originId}, result: ${
            result ? result[0] : ""
          }`
        );
        setLocation(result?.find((location) => location.id === +locationId));
        setOrigin(result?.find((location) => location.id === +originId));
        setIsLoading(false);
      });
    }
  }, []);

  const fetchEpisodes = async () => {
    const episodesId = character.episode
      .map((episode) => episode.substr(episode.lastIndexOf("/") + 1))
      .join(",");
    setEpisodeLoading(true);
    const episodes = await getEpisodeNames(episodesId);
    setEpisodeNames(episodes);
    setEpisodeLoading(false);
  };

  return (
    <div className="card">
      <div className="card-image">
        <img src={character.image} alt={character.name} />
      </div>
      <p className="name">{`${character.name} (${character.gender})`}</p>
      <p>{`${character.species} (${character.status})`}</p>
      <p>
        {`Episode Numbers: ${character.episode.length},`}{" "}
        {!episodeNames && (
          <span className="episode-name" onClick={fetchEpisodes}>
            (See Names)
          </span>
        )}{" "}
      </p>
      {episodeLoading && <p>...</p>}
      {!episodeLoading && episodeNames && (
        <p className="card-inner"> {episodeNames} </p>
      )}
      <div className="card-inner">
        <p>{`Location: ${character.location.name}`}</p>
        {isLoading && <p> ... </p>}
        {!isLoading && location && location.dimension && (
          <p>
            {" "}
            {`Dimension: ${location.dimension}, ResidenceNo: ${location.residents.length}`}{" "}
          </p>
        )}
        {!isLoading && !location && <p> Error in loading location! </p>}
      </div>
      <div className="card-inner">
        <p>{`Origin: ${character.origin.name}`}</p>
        {isLoading && <p> ... </p>}
        {!isLoading && origin && origin.dimension && (
          <p>
            {" "}
            {`Dimension: ${origin.dimension}, ResidenceNo: ${origin.residents.length}`}{" "}
          </p>
        )}
        {!isLoading && !origin && <p> Error in loading origin! </p>}
      </div>
    </div>
  );
};
export default ProfileCard;
