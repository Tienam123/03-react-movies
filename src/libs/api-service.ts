import axios from "axios";
import {BASE_URL, BEARER_KEY} from "../constants";

export const http = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BEARER_KEY}`
    }
})