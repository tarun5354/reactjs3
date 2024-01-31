import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import MovieModelComp from './MovieModelComp';


Modal.setAppElement('#root');

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);

  const fetchMovies = async () => {
    const url = 'https://movies-api14.p.rapidapi.com/shows';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'cc98ac1817msh748643f1d2755d0p10c31djsncc0419c0814a',
        'X-RapidAPI-Host': 'movies-api14.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result)
      setMovies(result.movies);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDateSubmit = (e) => {
    e.preventDefault();
  
    if (!movies) {
      console.error('Movies data is not available.');
      return;
    }
    console.log(movies)
    const filteredMovies = movies.filter((movie) => {
      console.log("I am from date Submit ")
      console.log("Movie release date:", movie.first_aired);
      console.log("From Date:", fromDate);
      console.log("To Date:", toDate);
  
      const releaseDate = new Date(movie.first_aired);
      console.log("Converted Release Date:", releaseDate);
  
      return releaseDate >= new Date(fromDate) && releaseDate <= new Date(toDate);
    });
    console.log("Filtered Movies:", filteredMovies);
    setMovies(filteredMovies);
    setFromDate('')
    setToDate('')
  };
  

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (!movies) {
      console.error('Movies data is not available.');
      return;
    }

    const searchedMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log(searchedMovies)
    setMovies(searchedMovies);
  };

  const openModal = (movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <div className='header'>
        <h1 className='header-title'>The collection of movies </h1>
      </div>
      <div className='container-1'>
        <form className='date-form' onSubmit={handleDateSubmit}>
          <label className='form-label'>From</label>
          <input
            className='date-input'
            type='date'
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <label className='form-label'>To</label>
          <input
            className='date-input'
            type='date'
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
          <button className='submit-button' type='submit'>
            Filter Movies
          </button>
        </form>
        <form className='search-form' onSubmit={handleSearchSubmit}>
          <label className='form-label'>Searching the movies</label>
          <input
            className='text-input'
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className='submit-button' type='submit'>
            Search Movie
          </button>
        </form>
        <br />
        <hr className='divider' />
      </div>
      <div className='Movie-container'>
        <div className='movie-block'>
          {movies ? (
            movies.map((movie) => (
              <div className='movie-cards' key={movie._id} onClick={() => openModal(movie)}>
                <h6 className='card-genre'>{movie.genres}</h6>
                <img
                  className='card-image'
                  src={movie.poster_path}
                  alt={movie.title}
                  onClick={() => openModal(movie)}
                />
                <h5 className='card-title'>{movie.title}</h5>
                <h4 className='card-release-date'>{movie.release_date}</h4>
              </div>
            ))
          ) : (
            <p>No movies available</p>
          )}
        </div>
      </div>
      <Modal
        isOpen={!!selectedMovie}
        onRequestClose={closeModal}
        contentLabel="Movie Details"
        className="Modal"
        overlayClassName="Overlay"
      >
        {selectedMovie && (
          <MovieModelComp selectedMovie={selectedMovie} closeModal={closeModal} />
        )}
      </Modal>
    </>
  );
}

export default MovieList;
