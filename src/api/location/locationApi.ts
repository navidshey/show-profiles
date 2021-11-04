import axios from "axios";
import ProfileLocation from './location';

const getLocationUrl = "https://rickandmortyapi.com/api/location/";

/**return an array of locations
 * 
 * @param ids - location ids which are seperated by ,
 * @returns - an array of Locaitons or undefined when something were wrong!
 */
//TODO: most of the location are same, so it is better to cache received data.
export const getLocations = async (ids: string) : Promise<ProfileLocation[] | undefined> =>{
    const result = axios
    .get(`${getLocationUrl}${ids}`)
    .then((res) =>{
       let data: ProfileLocation[] =  res.data;
       return data;
    })
    .catch((err) =>{
      console.log(err);
      return undefined;
    }
    );

    return result;
}