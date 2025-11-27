import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "../components/SearchBar";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies, Movie } from "@/services/api";
import MovieCard from "../components/MovieCard";

export default function Index() {
    const router = useRouter();

    const { data: movies, loading: moviesLoading, error: moviesError } =
        useFetch(() => fetchMovies({ query: "" }));

    const renderMovie = ({ item }: { item: Movie }) => (
        <View className="flex-1 items-center mb-5">
            <Image
                source={{ uri: item.Poster !== "N/A" ? item.Poster : undefined }}
                className="w-24 h-36 rounded-md"
                resizeMode="cover"
            />
            <Text className="text-white text-sm mt-2 text-center">{item.Title}</Text>
        </View>
    );

    return (
        <View className="flex-1 bg-primary">
            <Image
                source={images.bg}
                className="absolute w-full h-full z-0"
                resizeMode="cover"
            />

            <ScrollView
                className="flex-1 px-5"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
            >
                <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

                {moviesLoading ? (
                    <ActivityIndicator
                        size="large"
                        color="#0000ff"
                        className="mt-10 self-center"
                    />
                ) :moviesError ? (
                        <Text className="text-white">
                            Error: {moviesError instanceof Error ? moviesError.message : String(moviesError)}
                        </Text>
                    ): (
                    <View className="flex-1 mt-5">
                        <SearchBar
                            onPress={() => router.push("/search")}
                            placeholder="Search for a movie"
                        />

                        <Text className="text-lg text-white font-bold mt-5 mb-3">
                            Latest Movies
                        </Text>

                        <FlatList
                            data={movies}
                            renderItem={({ item }) => <MovieCard {...item} />}
                            keyExtractor={(item) => item.imdbID}
                            numColumns={3}
                            columnWrapperStyle={{
                                justifyContent: "flex-start",
                                gap: 20,
                                paddingRight: 5,
                            }}
                            className="mt-2 pb-32"
                            scrollEnabled={false}
                        />
                    </View>
                )}
            </ScrollView>
        </View>
    );
}
