const axios = require('axios');

interface FetchedTheMovieDb {
    title: string;
    releaseDate: string;
    poster: string;
    overview: string;
}

export class FetchTheMovieDb {
    async fetchMovieDb (tmdbId: number): Promise<FetchedTheMovieDb>{

        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${tmdbId}`,
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNzIwOTU1OGE3YWU1NzkwYzVlZWZiYjgxYjllZDk3MiIsInN1YiI6IjY0ZDY4NjYxZDEwMGI2MDBhZGEwYjY3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bhwXJxGgPODHteglo6iPiBGADqrigH9cDBcCpofHHD0'
            }
        };

        const { data } = await axios.request(options)
            .catch(function (error) {
                console.error(error);
            });

        return {
            title: data.title,
            releaseDate: data.release_date,
            poster: `https://image.tmdb.org/t/p/original/${data.poster_path}`,
            overview: data.overview,
        }
    }
}