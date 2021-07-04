/**
 * ABOUT THE "WITH CREDENTIALS" FLAG 
 *           ------------
 * 
 * JWT should be stored in an HTTPOnly cookie theses cookies are 
 * used in authentication process. If with credential is set to true
 * this indicates that cookies will be used in authentication process.
 * 
 * One more thing about it, if it was false (the default behavior) the jwt cookie
 * will be ignored.
 * 
 * for more details see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials
 */

import axios from "axios";
import config from "../../utils/config";
import Cookie from "js-cookie"
import apiInstance from "./api";

/**
 * Create new student 
 * @param data data to be posted
 * @returns [err, data] 
 */
async function resourcesPoster(resourceName: string, data: any) {
	return await apiInstance.post(`/${resourceName}`, { ...data }, { withCredentials: true })
		.then(response => [null, response.data])
		.catch(err => [err.response, null])
}

export default resourcesPoster;