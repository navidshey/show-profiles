import Episode from "../api/episode/episode";
import ProfileLocation from "../api/location/location";
import CharactersPagingList from "../api/profile/profile";

type cacheType = {
  id: string;
  data: cacheData;
};
type cacheData = CharactersPagingList | ProfileLocation | Episode;
export enum CacheId {
  Profile,
  Location,
  Episode,
}
/**Insert one element in localStorage
 *
 * @param cacheId - Enum Name of the cache to access
 * @param id - Id of element which is going to cache
 * @param data - Element to cache
 */
export const insertIntoCache = (
  cacheId: CacheId,
  id: string,
  data: cacheData
): void => {
  const cache = getCacheData(cacheId);
  cache.push({ id, data });
  localStorage.setItem(CacheId[cacheId], JSON.stringify(cache));
};

/**Insert list of element in localStorage
 *
 * @param cacheId - Enum Name of the cache to access
 * @param ids - Array of element id's which are going to cache
 * @param data - Array of elements to cache
 */
export const insertListIntoCache = (
  cacheId: CacheId,
  ids: string[],
  data: cacheData[]
): void => {
  for (let i = 0; i < ids.length; i++) {
    insertIntoCache(
      cacheId,
      ids[i],
      data.find(
        (item) => (item as ProfileLocation).id.toString() == ids[i]
      ) as cacheData
    );
  }
};

/**Find the element in the cached data
 *
 * @param cacheId - Enum Name of the cache to access
 * @param id - Id of element which is going to find
 * @returns - If id of element be found, the element will return, unless undefined will return
 */
export const findData = (
  cacheId: CacheId,
  id: string
): cacheType | undefined => {
  const cache = getCacheData(cacheId);
  return cache.find((item) => item.id == id);
};

/**Find list of elements in the cached data
 *
 * @param cacheId - Enum Name of the cache to access
 * @param ids - List of elements's id which is going to find, ids and seperated by comma ,
 * @returns - An array, containing a list elements that has found and list of Id s that are not cached. if each of the returned list are empty, undefined will return for that
 */
export const findListData = (
  cacheId: CacheId,
  ids: string
): [(cacheData | undefined)[], string[]] => {
  const cache = getCacheData(cacheId);
  const list = ids.split(",");
  const notCachedId: string[] = [];
  const cData = list.map((item) => {
    const found = cache.find((c) => item && c.id == item);
    if (found) {
      return found.data;
    } else {
      item && notCachedId.push(item);
    }
  });

  return [cData.filter((data) => data), notCachedId];
};

/**Get cache data from localStorage
 *
 * @param cacheId - Enum Name of cache object
 * @returns - cache object if anything exist, otherwise empty array
 */
const getCacheData = (cacheId: CacheId): cacheType[] => {
  const storage = localStorage.getItem(CacheId[cacheId]);
  return storage ? JSON.parse(storage) : [];
};

/**Clear specific cache id
 *
 * @param cacheId - cache id to clear
 */
export const clearSpecificCache = (cacheId: CacheId): void => {
  localStorage.setItem(CacheId[cacheId], "");
};

/**Clear all caches of the application
 *
 */
export const clearAllCache = (): void => {
  Object.keys(CacheId).map((key: string) =>
    localStorage.setItem(CacheId[+key], "")
  );
};
