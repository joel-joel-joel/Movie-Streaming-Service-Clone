import React from 'react';
import {Text, Image, View, FlatList, ActivityIndicator} from 'react-native';
import {images} from '@/constants/images';
import MovieCard from "@/app/components/MovieCard";
import useFetch from "@/services/useFetch";
import {fetchMovies} from "@/services/api";
import {icons} from "@/constants/icons";
import SearchBar from "../components/SearchBar";
import {updateSearchCount} from "@/services/appwrite";

const Search = () => {
    const [searchQuery, setSearchQuery] = React.useState('');

    const { data: movies, loading: moviesLoading, error: moviesError, fetchData } =
        useFetch(() =>
            fetchMovies({ query: searchQuery }),
            false);

    useEffect(() => {

        updateSearchCount(searchQuery, movies[0]);

        const timeoutId = setTimeout(async () => {
            if (searchQuery.trim()) {
                await loadMovies();

                // Call updateSearchCount only if there are results
                if (movies?.length! > 0 && movies?.[0]) {
                    await updateSearchCount(searchQuery, movies[0]);
                }
            } else {
                reset();
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);


    return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} className="flex-1 absolute w-full z-0" resizeMode="cover"/>

            <FlatList
                data={movies}
                renderItem={({item}) => <MovieCard {...item}/>}
                keyExtractor={(item) => item.imdbID.toString()}
                className="px-5"
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: 'center',
                  gap: 16,
                  marginVertical: 16
               }}
                contentContainerStyle={{paddingBottom: 100}}
                ListHeaderComponent={
                    <>
                        <View className="w-full flex-row justify-center items-center mt-20">

                            <Image source={icons.logo} className="w-12 h-10" />
                        </View>

                        <View className="my-5">
                            <SearchBar placeholder="Search for a movie"
                            value = {searchQuery}
                            onChangeText={(text: string) => {setSearchQuery(text);}}/>
                        </View>

                        {moviesLoading && (
                            <ActivityIndicator size="large" color="#0000ff" className="my-3"/>
                        )}

                        {moviesError && (
                            <Text className="text-red-500 px-5 my-3">
                                Error: {moviesError instanceof Error ? moviesError.message : String(moviesError)}
                            </Text>
                        )}

                        {!moviesLoading && !moviesError && searchQuery.trim() && (
                            <Text className="text-xl text-white font-bold">
                                No results found for {' '}
                                <Text className="text-accent"> {searchQuery} </Text>
                            </Text>
                        )}
                    </>
                }
            />

        </View>
    )
}

export default Search