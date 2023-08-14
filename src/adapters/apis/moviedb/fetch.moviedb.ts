import { injectable } from "inversify";

import axios from 'axios';
import { iFetchMovieDb, iFetchedTheMovieDBResponseDTO, iFetchedTheMovieDbOutputDTO } from "./iface";

@injectable()
export class FetchTheMovieDb implements iFetchMovieDb{
    async fetchMovieDb (tmdbId: number): Promise<iFetchedTheMovieDbOutputDTO>{
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${tmdbId}`,
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNzIwOTU1OGE3YWU1NzkwYzVlZWZiYjgxYjllZDk3MiIsInN1YiI6IjY0ZDY4NjYxZDEwMGI2MDBhZGEwYjY3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bhwXJxGgPODHteglo6iPiBGADqrigH9cDBcCpofHHD0'
            }
        };

        const response = await axios.request<iFetchedTheMovieDBResponseDTO>(options)
            .catch(function () {
                throw new Error('Failed to fetch movie from The Movie DB');
            });

        if (response && response.data) {
            const { data } = response;
            return {
                title: data.title,
                releaseDate: data.release_date,
                poster: `https://image.tmdb.org/t/p/original/${data.poster_path}`,
                overview: data.overview,
            }
        }
    }

}