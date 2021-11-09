import React, { useState, useEffect, ReactElement } from "react";
import { Character } from "../../api/profile/profile";
import { getLocations } from "./../../api/location/locationApi";
import ProfileLocation from "../../api/location/location";
import { getEpisodeNames } from "../../api/episode/episodeApi";
import ProfileCardDetail from "./profileCardDetail";
import * as Styled from "./profileStyle";
import Spinner from "../custom/Spinner/Spinner";
import Reload from "./../custom/Reload";

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
    if (episodesLoaded) fetchEpisodesName();
  }, [episodesLoaded]);

  const fetchEpisodesName = async () => {
    const episodesId = character.episode
      .map((episode) => episode.substr(episode.lastIndexOf("/") + 1))
      .join(",");
    const episodes = await getEpisodeNames(episodesId);
    setEpisodeNames(episodes);
  };

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
            {loadMore && episodeNames && (
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
          {!episodeNames && episodesLoaded && (
            <Reload
              errorMessage="Error in Load Names!"
              callBackFunction={fetchEpisodesName}
            />
          )}

          <Styled.CardInner>
            <Styled.General>{`Location: ${character.location.name}`}</Styled.General>
            {(isLoading || (locations && locations.location)) && (
              <ProfileCardDetail
                isLoading={isLoading}
                data={locations?.location}
                callBack={fetchLocations}
              />
            )}
            <Styled.General>{`Origin: ${character.origin.name}`}</Styled.General>
            {(isLoading || (locations && locations.origin)) && (
              <ProfileCardDetail
                isLoading={isLoading}
                data={locations?.origin}
                callBack={fetchLocations}
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
