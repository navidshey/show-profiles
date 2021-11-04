/**Episode
 * 
 * @param id - id of episode
 * @param name - name of episode
 * @param air_data - air_data of episode
 * @param characters - a list of @Character s in episode
 * @param url - url of Episode
 * @param created - created data of episode
 */
export default interface Episode{
    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: string[];
    url: string;
    created: string;
}