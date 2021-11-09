import axios from "axios";
import { CacheId, findData, insertIntoCache } from "../../util/caching";
import CharactersPagingList from "./profile";

const getProfilesUrl = "https://rickandmortyapi.com/api/character";
const profileCacheId = CacheId.Profile;

/**get list of characters
 *
 * @param page - an String number which determined page number
 * @returns - A profile which contains pagination info and array of characters
 */
export const getAllCharacters = async (
  page = "1"
): Promise<CharactersPagingList | undefined> => {
  const cData = findData(profileCacheId, page);
  if (cData) {
    return cData.data as CharactersPagingList;
  } else {
    const result = axios
      .get(page ? `${getProfilesUrl}?page=${page}` : getProfilesUrl)
      .then((res) => {
        const data: CharactersPagingList = res.data;
        insertIntoCache(profileCacheId, page, data);
        return data;
      })
      .catch(() => {
        //TODO: we have to handle true error message, if we know what are them
        return undefined;
      });
    return result;
  }
};
