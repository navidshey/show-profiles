import axios from "axios";
import Profile from "./profile";

const getProfilesUrl = "https://rickandmortyapi.com/api/character";

/**get list of characters
 *
 * @param page - an String number which determined page number
 * @returns - A profile which contains pagination info and array of characters
 */
export const getAllCharacters = async (
  page?: string
): Promise<Profile | undefined> => {
  const result = axios
    .get(page ? `${getProfilesUrl}?page=${page}` : getProfilesUrl)
    .then((res) => {
      const data: Profile = res.data;
      return data;
    })
    .catch(() => {
      //TODO: we have to handle true error message, if we know what are them
      return undefined;
    });

  return result;
};
