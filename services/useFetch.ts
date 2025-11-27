/* fetchMovies */
/* fetchMoviesDetails */

/* useFetch(fetchMovies) */



import {useEffect, useState} from "react";

const useFetch = <T>(fetchFunction: () => Promise<T> , autofetch= true) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<T | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);

            const result = await fetchFunction();

            setData(result);
        } catch (error) {
            // @ts-ignore
            setError(error instanceof Error ? error : new Error("An unexpected error occurred"));
        } finally {
            setLoading(false);
        }
    }

    const reset = () => {
        setData(null);
        setLoading(false);
        setError(null);
    }

    useEffect(() => {
        if (autofetch) {
            fetchData();
        }
    }, [])

    return {data, loading, error, fetchData, reset}
}

export default useFetch;