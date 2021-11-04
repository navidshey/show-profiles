import React, { useEffect, useState, ReactElement } from "react";
import { useParams } from "react-router-dom";
import Profile from "../../api/profile/profile";
import { getAllCharacters } from "../../api/profile/profileApi";
import "./profile.css";
import ProfileCard from "./profileCard";
import Spinner from "./../custom/Spinner/Spinner";
import Pagination from "../custom/Pagination/Pagination";

const Profiles = (): ReactElement => {
  const { page } = useParams<{
    page: string;
  }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profiles, setProfiles] = useState<Profile | undefined>();

  useEffect(() => {
    setIsLoading(true);
    getAllCharacters(page).then((result) => {
      setProfiles(result);
      setIsLoading(false);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <>
      {isLoading && <Spinner />}
      {profiles &&
        profiles.results.map((character) => {
          return (
            <ProfileCard
              key={`character-${character.id}`}
              character={character}
            />
          );
        })}
      {!isLoading && !profiles && <div>Error in fetching data!</div>}
      {profiles && profiles.info && +profiles.info.count > 0 && (
        <Pagination prop={profiles.info}></Pagination>
      )}
    </>
  );
};
export default Profiles;
