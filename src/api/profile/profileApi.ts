import axios from "axios";
import Profile from './profile';

const getProfilesUrl = "https://rickandmortyapi.com/api/character";

/**get list of characters
 * 
 * @param page - an String number which determined page number
 * @returns - A profile which contains pagination info and array of characters
 */
export const getAllCharacters = async (page?: string) : Promise<Profile | undefined> =>{
    const result = axios
    .get(page ? `${getProfilesUrl}?page=${page}` : getProfilesUrl)
    .then((res) =>{
       let data: Profile =  res.data;
       return data;
    })
    .catch((err) =>{
      console.log(err);
      return undefined;
    }
    );

    return result;
}