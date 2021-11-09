import axios from "axios";
import { CacheId, findListData, insertIntoCache } from "../../util/caching";
import Episode from "./episode";

const getEpisodeUrl = "https://rickandmortyapi.com/api/episode/";
const episodeCacheId = CacheId.Episode;

/**get an array of episodes
 *
 * @param ids - episode ids which are seperated by ,
 * @returns - an array of Episodes or undefined when something were wrong!
 */
export const getEpisodes = async (
  ids: string
): Promise<Episode[] | Episode | undefined> => {
  const [cData, notCachedId] = findListData(episodeCacheId, ids);
  if (notCachedId.length == 0 && cData.length > 0) {
    return cData as Episode[];
  } else {
    const result = axios
      .get(`${getEpisodeUrl}${ids}`)
      .then((res) => {
        const resData = Array.isArray(res.data) ? res.data : [res.data];
        insertListIntoCache(episodeCacheId, resData);
        const data: Episode[] | Episode = [...resData, ...cData];
        return data;
      })
      .catch(() => {
        //TODO: we have to handle true error message, if we know what are them
        return undefined;
      });

    return result;
  }
};

export const getEpisodeNames = async (
  ids: string
): Promise<string | undefined> => {
  const data = await getEpisodes(ids);
  return Array.isArray(data)
    ? data?.map((episode) => episode.name).join(", ")
    : data?.name;
};

const insertListIntoCache = (cacheId: CacheId, data: Episode[]) => {
  for (let i = 0; i < data.length; i++) {
    insertIntoCache(cacheId, data[i].id.toString(), data[i]);
  }
};
