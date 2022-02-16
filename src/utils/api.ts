import axios from "axios";

import { API_URL } from "constants/index";

const API = axios.create({ baseURL: API_URL });

export default API;
