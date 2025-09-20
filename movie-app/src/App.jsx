import { useEffect, useState } from 'react';
import Search from './components/Search.jsx'
import Spinner from './components/Spinner.jsx';
import MovieCard from './components/MovieCard.jsx';
import { useDebounce } from 'react-use'
import { getTrendingMovies, updateSearchCount } from './components/appwrite.js';
import { Databases } from 'appwrite';

//API - Applicaiton Programming Interface - a set of rules that allows one software app to talk to another,

const API_BASE_URL = 'https://api.themoviedb.org/3';

//API key kept out of source code
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers:{
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  //debounce search term to prevent API request spam
  //waiting 800ms
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 800, [searchTerm])

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const endpoint = query
      // encodeURI ensures that whatever character is put in it can process
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      // alert(response);
      // throw new Error('Failed to fetch movies');

      if(!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();
      // console.log(data);
      //if failed to get a response
      if(data.response === 'False') {
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovieList([]);
        return;
      }

      //if response has been given back read the results from json file
      setMovieList(data.results)

      // updateSearchCount();
      if(query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }

    } catch (error) {
      console.error(`Error fetching movies: ${error}`)
      setErrorMessage('Error fetching movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }

  const loadTrendingMovies = async () => {
    try{
      const movies = await getTrendingMovies();

      setTrendingMovies(movies);
    } catch (error){
      console.log(`Error fetching trending movies: ${error}`);
      // setErrorMessage('Error fetching trending movies'); should not do this because we are stopping later
      // on which will break our application if the trending doesnt work
    }
  }

  useEffect(() =>{
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect( () => {
    loadTrendingMovies();
  }, [])

  return(
    <main>
      <div className = "pattern" />

      <div className = "wrapper">

        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>Find <span className = "text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>
          
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <h1 className = "text-white">{searchTerm}</h1>
        </header>

      {trendingMovies.length > 0 && (
        <section className="trending">
          <h2>Trending Movies</h2>

          <ul>
            {trendingMovies.map((movie, index) => (
              <li key={movie.$id}>
                <p>{index + 1}</p>
                <img src={movie.poster_url} alt={movie.title} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className = "all-movies">
        <h2>All Movies</h2>

        {/* conditional rendering */}
        {/* {errorMessage && <p className = "text-red-500">{errorMessage}</p>} */}

{/* if isLoading is true, else if there is an errorMessage, else display movieList.map */}
        {isLoading ? (
          // <p className='text-white'>Loading...</p>
          <Spinner/>
        ) : errorMessage ? (
          <p className = 'text-red-500'>{errorMessage}</p>
        ) : (
          <ul>
            {/* destructured in MovieCard */}
            {movieList.map((movie) => (
              <MovieCard key = {movie.id} movie={movie} />
            ))}
          </ul>
        )}
      </section>

      </div>
    </main>
  )
}

export default App