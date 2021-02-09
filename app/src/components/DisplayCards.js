import React, { Component } from "react";

import Card from "../components/Card";

class DisplayCards extends Component {
  render() {
    const arr = this.props.watchedMoviesData.map((movie) => movie.imdbID);
    return (
      <div className="display-cards">
        <div className="cards-container">
          {this.props.toggle
            ? this.props.allMovieData.map((movie, index) => (
                <Card
                  key={index}
                  movie={movie}
                  toggle={this.props.toggle}
                  onMovieWatch={this.props.onMovieWatch}
                  onMovieRemove={this.props.onMovieRemove}
                  state={arr.includes(movie.imdbID)}
                />
              ))
            : this.props.watchedMoviesData
                .filter((movie) =>
                  movie.Title.toLowerCase().includes(
                    this.props.searchInput.toLowerCase()
                  )
                )
                .map((movie, index) => (
                  <Card
                    key={movie.id || movie.imdbID}
                    movie={movie}
                    toggle={this.props.toggle}
                    onMovieWatch={this.props.onMovieWatch}
                    onMovieRemove={this.props.onMovieRemove}
                    state={true}
                  />
                ))}
        </div>
      </div>
    );
  }
}

export default DisplayCards;
