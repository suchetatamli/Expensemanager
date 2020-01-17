'use strict';
import { environment as env} from '../environments/environment';
let urlObj = {
    "host" : env.api.host,
    "prefix" : env.api.prefix
}
export const API_URL = urlObj.host + urlObj.prefix;