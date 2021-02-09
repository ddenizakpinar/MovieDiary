import React, { Component } from "react";

import Placeholder from "../assets/placeholder.png";

class Card extends Component {
  render() {
    const { movie, onMovieWatch, onMovieRemove } = this.props;
    return (
      <div className="card">
        <div>
          <img
            height={300}
            onClick={() =>
              window.open("https://www.imdb.com/title/" + movie.imdbID)
            }
            className="img"
            src={
              movie.Poster !== "N/A"
                ? movie.Poster
                : Placeholder
            }
            alt={movie.Title}
          />
        </div>
        <div className="action-button">
          {!this.props.state ? (
            <div className="button" onClick={() => onMovieWatch(movie)}>
              <i className="far fa-check-circle"></i>
            </div>
          ) : (
            <div className="button" onClick={() => onMovieRemove(movie)}>
              <i className="far fa-times-circle"></i>
            </div>
          )}
        </div>
        <div className="movie-description">
          <div className="title">{movie.Title}</div>
          <div className="meta-container">
            <div className="meta">
              <div className="year">{movie.Year}</div>
              <div className="divider">•</div>
              <div className="rating">{movie.Type}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
