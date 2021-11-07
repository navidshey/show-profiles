import axios from "axios";
import Episode from "./episode";

const getEpisodeUrl = "https://rickandmortyapi.com/api/episode/";

/**get an array of episodes
 *
 * @param ids - episode ids which are seperated by ,
 * @returns - an array of Episodes or undefined when something were wrong!
 */
//TODO: better to cache received data.
export const getEpisodes = async (
  ids: string
): Promise<Episode[] | Episode | undefined> => {
  const result = axios
    .get(`${getEpisodeUrl}${ids}`)
    .then((res) => {
      const data: Episode[] | Episode = res.data;
      return data;
    })
    .catch(() => {
      //TODO: we have to handle true error message, if we know what are them
      return undefined;
    });

  return result;
};

export const getEpisodeNames = async (
  ids: string
): Promise<string | undefined> => {
  const data = await getEpisodes(ids);
  return Array.isArray(data)
    ? data?.map((episode) => episode.name).join(", ")
    : data?.name;
};
