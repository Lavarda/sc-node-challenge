export interface iGenresData {
    id: number;
    name: string;
}

export interface iProductionCompaniesData {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

export interface iProductionCountriesData {
    iso_3166_1: string;
    name: string;
}

export interface iSpokenLanguagesData {
    english_name: string;
    iso_639_1: string;
    name: string;
}

export interface iFetchedTheMovieDBResponseDTO {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: string;
    budget: number;
    genres: iGenresData[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: iProductionCompaniesData[];
    production_countries: iProductionCountriesData[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: iSpokenLanguagesData[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface iFetchedTheMovieDbOutputDTO {
    title: string;
    releaseDate: string;
    poster: string;
    overview: string;
}

export interface iFetchMovieDb {
    fetchMovieDb(tmdbId: number): Promise<iFetchedTheMovieDbOutputDTO>;
}