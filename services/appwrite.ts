// track searches made by users

import {Client, Query} from "react-native-appwrite";
import {Databases} from "react-native-appwrite";

const DATABASE_ID= process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID,
        [Query.equal('searchTerm', query)])

    console.log(result)

    // check if a record of that search has already been stored
    // if a document is found increment the searchCount field
    // if no document is found, create a new doc in database

    if (result.documents.length > 0) {
        const document = result.documents[0];
        await database.updateDocument(DATABASE_ID, COLLECTION_ID, document.$id, {searchCount: document.searchCount + 1});
    } else {
        await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
            searchTerm: query,
            movieId: movie.id,
            searchCount: 1,
            poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        })
    }

}
