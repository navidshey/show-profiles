import axios from "axios";
import { CacheId, findListData, insertIntoCache } from "../../util/caching";
import ProfileLocation from "./location";

const getLocationUrl = "https://rickandmortyapi.com/api/location/";
const locationCacheId = CacheId.Location;

/**get an array of locations
 *
 * @param ids - A single location id or a list of location ids which are seperated by ,
 * @returns - an array of Locaitons or undefined when something were wrong!
 */
export const getLocations = async (
  ids: string
): Promise<ProfileLocation[] | undefined> => {
  const [cData, notCachedId] = findListData(locationCacheId, ids);
  if (notCachedId.length == 0 && cData.length > 0) {
    return cData as ProfileLocation[];
  } else {
    const result = axios
      .get(`${getLocationUrl}${notCachedId.toString()}`)
      .then((res) => {
        const resData = Array.isArray(res.data) ? res.data : [res.data];
        insertListIntoCache(locationCacheId, resData);
        const data: ProfileLocation[] = [...resData, ...cData];
        return data;
      })
      .catch(() => {
        //TODO: we have to handle true error message, if we know what are them
        return undefined;
      });
    return result;
  }
};

const insertListIntoCache = (cacheId: CacheId, data: ProfileLocation[]) => {
  for (let i = 0; i < data.length; i++) {
    insertIntoCache(cacheId, data[i].id.toString(), data[i]);
  }
};
