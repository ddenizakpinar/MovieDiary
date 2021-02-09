import React, { Component } from "react";
import axios from "axios";

import DisplayCards from "../components/DisplayCards";
import Header from "../components/Header";
import Switch from "../components/Switch";
import Input from "../components/Input";
import randomWords from "random-words";

class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggle: true,
      searchInput: "",
      allMovieData: [],
      watchedMoviesData: [],
      page: 1,
      shouldLoadMore: true,
    };
  }

  componentDidMount() {
    this.getMovies(randomWords());
    this.getWatchedMovies();
    window.addEventListener("scroll", this.listenToScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.listenToScroll);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.scrollPosition > 0.8 && this.state.shouldLoadMore) {
      this.setState({ shouldLoadMore: false }, () => this.nextPage());
    }
  }

  listenToScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const scrolled = winScroll / height;

    this.setState({
      scrollPosition: scrolled,
    });
  };

  onToggleChange = (checked) => {
    this.setState({
      toggle: checked,
    });
  };

  onSearchInputChange = (value) => {
    this.setState({
      searchInput: value,
    });
  };

  onMovieWatch = (movie) => {
    axios
      .post("http://localhost:5000/api/movie/new", { ...movie })
      .then((res) => {
        this.setState({
          watchedMoviesData: [movie, ...this.state.watchedMoviesData],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onMovieRemove = (removeMovie) => {
    axios
      .delete("http://localhost:5000/api/movie/remove", {
        data: { ...removeMovie },
      })
      .then((res) => {
        this.setState({
          watchedMoviesData: this.state.watchedMoviesData.filter(
            (movie) => movie.imdbID !== removeMovie.imdbID
          ),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getWatchedMovies = () => {
    axios.get("http://localhost:5000/api/movie/getAll").then((res) => {
      this.setState({
        watchedMoviesData: res.data,
        fetching: false,
      });
    });
  };

  getMovies = (searchString = this.state.searchInput) => {
    axios
      .get("https://movie-database-imdb-alternative.p.rapidapi.com/", {
        params: {
          s: searchString,
          page: String(this.state.page),
          r: "json",
        },
        headers: {
          "x-rapidapi-key":
            "API_KEY",
          "x-rapidapi-host": "API_HOST",
          useQueryString: true,
        },
      })
      .then((result) => {
        this.setState({
          allMovieData: [...this.state.allMovieData, ...result.data.Search],
          shouldLoadMore: true,
          fetching: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  nextPage = () => {
    this.setState(
      (prev) => ({
        page: prev.page + 1,
      }),
      () => {
        this.getMovies();
      }
    );
  };

  onNewSearch = () => {
    this.setState(
      {
        toggle: true,
        page: 1,
        allMovieData: [],
      },
      () => {
        this.getMovies();
      }
    );
  };

  onKeyPress = (e) => {
    if (e.keyCode === 13) {
      this.onNewSearch();
    }
  };

  render() {
    return (
      <div className="main-page">
        <Header />
        <div className="control">
          <Switch
            toggle={this.state.toggle}
            onToggleChange={this.onToggleChange}
          />
          <div className="input-area" onKeyDown={(e) => this.onKeyPress(e)}>
            <Input
              searchInput={this.state.searchInput}
              onSearchInputChange={this.onSearchInputChange}
            />
            <div onClick={() => this.onNewSearch()} className="search-button">
              Search
            </div>
          </div>
        </div>

        {(this.state.toggle && this.state.allMovieData.length === 0) ||
        (!this.state.toggle && this.state.watchedMoviesData.length === 0) ? (
          <div className="loading">Loading...</div>
        ) : (
          <DisplayCards
            onMovieRemove={this.onMovieRemove}
            onMovieWatch={this.onMovieWatch}
            allMovieData={this.state.allMovieData}
            watchedMoviesData={this.state.watchedMoviesData}
            toggle={this.state.toggle}
            searchInput={this.state.searchInput}
            nextPage={this.nextPage}
          />
        )}
      </div>
    );
  }
}

export default MainPage;
