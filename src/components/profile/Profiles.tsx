import React, { useEffect, useState, ReactElement } from "react";
import { useParams } from "react-router-dom";
import CharactersPagingList, { Character } from "../../api/profile/profile";
import { getAllCharacters } from "../../api/profile/profileApi";
import ProfileCard from "./profileCard";
import Pagination from "../custom/Pagination/Pagination";
import { getEpisodes } from "../../api/episode/episodeApi";

const Profiles = (): ReactElement => {
  const { page } = useParams<{
    page: string;
  }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [episodesLoaded, setEpisodesLoaded] = useState<boolean>(false);
  const [profiles, setProfiles] = useState<CharactersPagingList | undefined>();

  useEffect(() => {
    setIsLoading(true);
    setEpisodesLoaded(false);
    getAllCharacters(page).then((result) => {
      setProfiles(result);
      setIsLoading(false);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      if (profiles && profiles.results) {
        const episodesId = fetchEpisodesId(profiles.results);
        await getEpisodes(episodesId.toString());
        setEpisodesLoaded(true);
      }
    };

    fetchEpisodes();
  }, [profiles]);

  const fetchEpisodesId = (characters: Character[]): string[] => {
    const result: string[] = [];
    if (characters.length > 0) {
      for (const profile of characters) {
        if (profile.episode) {
          for (const link of profile.episode) {
            const id = link.substr(link.lastIndexOf("/") + 1);
            if (!result.includes(id)) {
              result.push(id);
            }
          }
        }
      }
    }
    return result;
  };

  return (
    <>
      {profiles &&
        profiles.results.map((character) => {
          return (
            <ProfileCard
              key={`character-${character.id}`}
              loadingCharacter={isLoading}
              character={character}
              episodesLoaded={episodesLoaded}
            />
          );
        })}
      {!isLoading && !profiles && <div>Error in fetching data!</div>}
      {profiles && profiles.info && +profiles.info.count > 0 && (
        <Pagination {...profiles.info}></Pagination>
      )}
    </>
  );
};
export default Profiles;
