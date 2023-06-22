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
      const response = await fetch('https://swapi.dev/api/films')
      const data = await response.json();

      if (!response.ok) {

      }

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

    }

  };


  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>uhm...i think you should click on the button above🤔</p>}
        {isLoading && <p>oh right.. hang on...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
