export const OMDB_CONFIG = {
    BASE_URL: "https://www.omdbapi.com/",
    API_KEY: "22e04e4b",
};


export interface Movie {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
    Type: string;
    imdbVotes: any;
    Released: any;

}

export interface MovieDetails extends Movie {
    Rated?: string;
    Runtime?: string;
    Genre?: string;
    Plot?: string;
    Director?: string;
    Actors?: string;
}

/**
 * Fetch movies from OMDb
 * - If `query` is empty → fetch a default set of movies (e.g., popular movies from a recent year)
 * - If `query` has value → search results from OMDb
 */
export const fetchMovies = async ({
                                      query,
                                  }: {
    query?: string;
} = {}): Promise<Movie[]> => {
    try {
        const searchQuery = query && query.length > 0 ? query : "Avengers"; // default search
        const url = `${OMDB_CONFIG.BASE_URL}?apikey=${OMDB_CONFIG.API_KEY}&s=${encodeURIComponent(searchQuery)}&type=movie`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch movies: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.Response === "False") {
            return [];
        }

        return data.Search;
    } catch (error: any) {
        console.error("fetchMovies error:", error.message);
        return [];
    }
};

/**
 * Fetch detailed information for a specific movie
 */
export const fetchMovieDetails = async (
    imdbID: string
): Promise<MovieDetails> => {
    try {
        const url = `${OMDB_CONFIG.BASE_URL}?apikey=${OMDB_CONFIG.API_KEY}&i=${imdbID}&plot=full`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch movie details: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.Response === "False") {
            throw new Error(`Movie not found: ${imdbID}`);
        }

        return data;
    } catch (error: any) {
        console.error("fetchMovieDetails error:", error.message);
        throw error;
    }
};
