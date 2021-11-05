/**Profile containing pagination Info and list of Character
 *
 * @param info - pagination @Info
 * @param character - a list of @Character s
 */
export default interface Profile {
  info: Info;
  results: Character[];
}

/**features of a characters
 *
 * @param id - id of character
 * @param name - name of character
 * @param status - status of character as string
 * @param species - species of character as string
 * @param type - type of character as string
 * @param gender - gender of character as string
 * @param origin - an object( @NameUrl ) of Name and url for origin of the character
 * @param location - an object( @NameUrl ) of Name and url for location of the character
 * @param image - image of the character
 * @param episode - an array of links to characters episode
 * @param url - url link of character
 * @param created - created data of the character
 */
export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: NameUrl;
  location: NameUrl;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

/**info about received data pagination
 *
 * @param count - total number of data
 * @param pages - number of pages
 * @param next - url to fetch next paged data
 * @param prev - url to fetch previous paged data
 */
export interface Info {
  count: string;
  pages: number;
  next?: string;
  prev: string;
}

/** A key value to save name and url
 *
 * @param name - name of the data
 * @param url - url of data
 */
interface NameUrl {
  name: string;
  url: string;
}
