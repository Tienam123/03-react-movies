import {http} from "../libs/api-service.ts";
import {ROUTES} from "../constants";
import type {MoviesResponse} from "../types/movie.ts";

export const fetchMovie = async (query:string,page:string = '1'):Promise<MoviesResponse> => {
    const urlSearchParams:URLSearchParams = new URLSearchParams({
        query,
        page
    })
    const {data} = await http.get<MoviesResponse>(`${ROUTES.searchMovie}?${urlSearchParams.toString()}`);
    return data;
}