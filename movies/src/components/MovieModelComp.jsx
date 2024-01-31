import React from 'react';


function MovieModelComp({ selectedMovie, closeModal }) {
  return (
    <div>
      <div className="Modal-content">
        <img
          src={selectedMovie.poster_path}
          alt={selectedMovie.title}
          style={{ width: '200px', marginLeft: '40%' }} 
        />
        <div>
          <h2 className="modal-title">{selectedMovie.title}</h2>
          <h4 className="modal-release-date">Release Date: {selectedMovie.release_date}</h4>
          <br />
          <h3 className="modal-overview">Overview of the film:</h3>
          <p className="modal-text">{selectedMovie.overview}</p>
          <h3 className="modal-genres">Genres:</h3>
          <p className="modal-text">{selectedMovie.genres.join(', ')}</p>
        </div>
        <button className="modal-close-button" onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
}

export default MovieModelComp;
