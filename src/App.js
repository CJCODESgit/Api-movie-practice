import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchMoviesHandler() {
    setisLoading(true);
    setError(null);
    try {
      //removed 's' after film in the fetch link correct link is https://swapi.dev/api/films just testing errors
      const response = await fetch('https://swapi.dev/api/film');

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
  };


  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>uhm...i think you should click on the button above🤔</p>}
        {isLoading && <p>oh right.. hang on...</p>}
        {!isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
