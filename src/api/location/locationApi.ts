import axios from "axios";
import ProfileLocation from "./location";

const getLocationUrl = "https://rickandmortyapi.com/api/location/";

/**get an array of locations
 *
 * @param ids - location ids which are seperated by ,
 * @returns - an array of Locaitons or undefined when something were wrong!
 */
//TODO: better to cache received data.
export const getLocations = async (
  ids: string
): Promise<ProfileLocation[] | undefined> => {
  const result = axios
    .get(`${getLocationUrl}${ids}`)
    .then((res) => {
      const data: ProfileLocation[] = res.data;
      return data;
    })
    .catch(() => {
      //TODO: we have to handle true error message, if we know what are them
      return undefined;
    });

  return result;
};
