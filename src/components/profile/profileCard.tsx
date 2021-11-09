import React, { useState, useEffect, ReactElement } from "react";
import { Character } from "../../api/profile/profile";
import { getLocations } from "./../../api/location/locationApi";
import ProfileLocation from "../../api/location/location";
import { getEpisodeNames } from "../../api/episode/episodeApi";
import ProfileCardDetail from "./profileCardDetail";
import * as Styled from "./profileStyle";
import Spinner from "../custom/Spinner/Spinner";

export type Props = {
  character: Character;
  loadingCharacter: boolean;
  episodesLoaded: boolean;
};
type locationsStateType =
  | {
      location?: ProfileLocation;
      origin?: ProfileLocation;
    }
  | undefined;

const ProfileCard = ({
  character,
  loadingCharacter,
  episodesLoaded,
}: Props): ReactElement => {
  const [locations, setLocations] = useState<locationsStateType>();
  const [episodeNames, setEpisodeNames] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadMore, setLoadMore] = useState<boolean>(true);

  const fetchEpisodes = () => {
    setLoadMore((prev) => !prev);
  };

  const shortList = () => {
    if (episodeNames) {
      const names = episodeNames.split(",");
      return names.length > 3
        ? `${names.splice(0, 3).toString()} [show ${names.length - 3} more]`
        : "";
    }
    return "...";
  };

  useEffect(() => {
    const getEpisodesName = async () => {
      const episodesId = character.episode
        .map((episode) => episode.substr(episode.lastIndexOf("/") + 1))
        .join(",");
      const episodes = await getEpisodeNames(episodesId);
      setEpisodeNames(episodes);
    };
    if (episodesLoaded) getEpisodesName();
  }, [episodesLoaded]);

  const fetchLocations = async () => {
    setIsLoading(true);
    const locationId = character.location.url.substr(
      character.location.url.lastIndexOf("/") + 1
    );
    const originId = character.origin.url.substr(
      character.origin.url.lastIndexOf("/") + 1
    );
    const ids = [];
    locationId && ids.push(locationId);
    originId && ids.push(originId);
    setIsLoading(true);
    getLocations(ids.toString()).then((result) => {
      setLocations({
        location: locationId
          ? result?.find((location) => location.id === +locationId)
          : undefined,
        origin: originId
          ? result?.find((location) => location.id === +originId)
          : undefined,
      });
      setIsLoading(false);
    });
  };

  return (
    <>
      {loadingCharacter && (
        <Styled.Card>
          <Spinner />
        </Styled.Card>
      )}
      {!loadingCharacter && (
        <Styled.Card>
          <Styled.CardImage>
            <img src={character.image} alt={character.name} />
          </Styled.CardImage>
          <Styled.Name>{`${character.name} (${character.gender})`}</Styled.Name>
          <Styled.General>{`${character.species} (${character.status})`}</Styled.General>
          <Styled.General>
            {`Episode Numbers: ${character.episode.length}`}
            {loadMore && (
              <>
                <Styled.Episode onClick={fetchEpisodes}>
                  {shortList()}
                </Styled.Episode>
                <Styled.Episode>
                  {episodeNames &&
                    episodeNames.split(",").length < 3 &&
                    episodeNames}
                </Styled.Episode>
              </>
            )}
          </Styled.General>
          {!loadMore && episodeNames && (
            <>
              <Styled.Episode onClick={fetchEpisodes}>
                (show less)
              </Styled.Episode>
              <Styled.CardInner> {episodeNames} </Styled.CardInner>
            </>
          )}

          <Styled.CardInner>
            <Styled.General>{`Location: ${character.location.name}`}</Styled.General>
            {(isLoading || locations) && (
              <ProfileCardDetail
                isLoading={isLoading}
                data={locations?.location}
              />
            )}
            <Styled.General>{`Origin: ${character.origin.name}`}</Styled.General>
            {(isLoading || locations) && (
              <ProfileCardDetail
                isLoading={isLoading}
                data={locations?.origin}
              />
            )}
            {!locations && (
              <Styled.Episode
                onClick={fetchLocations}
                data-testid="show-detail-link"
              >
                (Show Details)
              </Styled.Episode>
            )}
          </Styled.CardInner>
        </Styled.Card>
      )}
    </>
  );
};
export default ProfileCard;
