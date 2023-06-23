import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);

  // adding useCallback to help us apply the function fetchmovieshandler as a dependency to useEffect

  const fetchMoviesHandler = useCallback(async () => {
    setisLoading(true);
    setError(null);
    try {
      //removed 's' after film in the fetch link correct link is https://swapi.dev/api/films just testing errors
      const response = await fetch('https://swapi.dev/api/films');

      if (!response.ok) {
        throw new Error('hate to break it to you but something went wrong 😞...');
      }

      const data = await response.json();

      const transformedMovies = data.results.map(movieData => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        }
      });
      setMovies(transformedMovies);
      setisLoading(false);
    } catch (error) {
      setError(error.message)
    }
    setisLoading(false);
  }, []);

  // useEffect to make us fetch data automatically without the button and we can also use button to reload manually.

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  let content = <p>uhm...i think you should click on the button above🤔</p>

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />
  }

  if (error) {
    content = <p>{error}</p>
  }

  if (isLoading) {
    content = <p>oh right.. hang on...</p>
  }


  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
