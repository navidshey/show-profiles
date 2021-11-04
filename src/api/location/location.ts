/**Profile Location data
 *
 * @param id - id of location
 * @param name - name of location
 * @param type - type of locaiton as string
 * @param dimension - dimension of locaiton
 * @param residents - an array of resident url locations
 * @param url - url of location
 * @param created - created data of location
 */
export default interface ProfileLocation {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}
