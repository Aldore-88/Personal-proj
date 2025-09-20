import {Client, Databases, ID, Query} from 'appwrite'

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;
// const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID; vid=1:49:46

const client = new Client()
.setEndpoint(ENDPOINT)
.setProject(PROJECT_ID);

const database = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
    // console.log(PROJECT_ID, DATABASE_ID)

    //1. Use Appwrite SDK to check if the search term exists in the database
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID,[
            Query.equal('searchTerm', searchTerm),
        ])
        
        //2. if it does, check the count
        if(result.documents.length > 0) {
            const doc = result.documents[0]
            await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
                count: doc.count + 1,
            })
            //3. if it doesnt, create new document iwth the search term and count as 1
        }   else {
                await database.createDocument(DATABASE_ID, COLLECTION_ID,
                    ID.unique(), {
                    searchTerm,
                    count: 1,
                    movie_id: movie.id,
                    poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                })
        }
    } catch (error) {

    }
}

export const getTrendingMovies = async() => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc("count")
        ])

        return(result.documents);
    } catch (error) {
        console.log(error);

    }
}