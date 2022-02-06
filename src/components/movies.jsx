import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  movieAdded,
  movieRemoved,
  movieUpdated,
  moviesLoaded,
  genresLoaded,
  getMoviesByTitle,
  getMoviesByGenre,
} from "../store/entities";
import {
  genreSelected,
  pageSelected,
  columnSortedBy,
  tableFilteredBy,
  DEFAULT_SELECTED,
} from "../store/ui";
import { saveMovie } from "../services/movieService";
import { toast } from "react-toastify";
import { getMovies, deleteMovie } from "../services/movieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/genreService";
import MoviesTable from "./moviesTable";
import Button from "./common/button";
import SearchBox from "./common/searchBox";
import _ from "lodash";

class Movies extends Component {
  PAGE_SIZE = 4;

  async componentDidMount() {
    const { getGenres, getMovies, moviesLoaded, genresLoaded, ui } = this.props;
    const { data } = await getGenres();
    const genres = [ui.selectedGenre, ...data];
    const { data: movies } = await getMovies();

    moviesLoaded(movies);
    genresLoaded(genres);
  }

  handleDelete = async (id) => {
    const { movieRemoved, movieAdded, movies } = this.props;

    try {
      movieRemoved(id);
      await deleteMovie(id);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500
      ) {
        toast.error(error.response.data);
      }
      const movie = movies.find((movie) => movie._id === id);
      movieAdded(movie);
    }
  };

  handleLikeAndUnlike = async (movie) => {
    const { movieUpdated, movies } = this.props;
    const moviesCopied = [...movies];
    const index = moviesCopied.indexOf(movie);
    const updatedMovie = { ...moviesCopied[index] };

    updatedMovie.isLiked = !moviesCopied[index].isLiked;
    movieUpdated(updatedMovie);

    try {
      await saveMovie(this.preparePayload(updatedMovie));
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("The movie with the given ID was not found.");
      }
      toast.error(error.message);
      movieUpdated(movie);
    }
  };

  preparePayload = (movie) => ({
    _id: movie._id,
    title: movie.title,
    genreId: movie.genre._id,
    numberInStock: movie.numberInStock,
    dailyRentalRate: movie.dailyRentalRate,
    isLiked: movie.isLiked,
  });

  handlePageChange = (page) => {
    this.props.pageSelected(page);
  };

  hanleGenreSelect = (genre) => {
    const { pageSelected, genreSelected, tableFilteredBy } = this.props;

    genreSelected(genre);
    pageSelected(1);
    tableFilteredBy("");
  };

  handleSort = (sortColumn) => {
    this.props.columnSortedBy(sortColumn);
  };

  handleSearch = (query) => {
    const { pageSelected, genreSelected, tableFilteredBy } = this.props;

    genreSelected(DEFAULT_SELECTED);
    pageSelected(1);
    tableFilteredBy(query);
  };

  getPagedData = () => {
    const { getMoviesByTitle, getMoviesByGenre, movies, ui } = this.props;
    const { currentPage, selectedGenre, sortColumn, searchQuery } = ui;

    let filtered = movies;

    if (searchQuery) filtered = getMoviesByTitle(searchQuery);
    else if (selectedGenre && selectedGenre._id !== 0)
      filtered = getMoviesByGenre(selectedGenre);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const moviesToShow = paginate(sorted, currentPage, this.PAGE_SIZE);

    return { totalCount: filtered.length, data: moviesToShow };
  };

  render() {
    const { movies, genres, ui, history, user } = this.props;
    const { currentPage, selectedGenre, sortColumn, searchQuery } = ui;
    const { totalCount, data: moviesToShow } = this.getPagedData();

    if (movies.length === 0) return <p>There are no movies in the database </p>;

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-2">
            <ListGroup
              items={genres}
              onItemChange={this.hanleGenreSelect}
              selectedItem={selectedGenre}
            />
          </div>
          <div className="col-10">
            {user && (
              <Button
                data={history}
                onClick={(data) => data.push("/movies/new")}
                iconClass="fa fa-plus"
                btnClass="btn btn-primary btn-md add"
                text="New Movie"
              ></Button>
            )}
            <p>{`Showing ${totalCount} movies in the database.`}</p>
            <SearchBox onChange={this.handleSearch} value={searchQuery} />
            <MoviesTable
              sortColumn={sortColumn}
              movies={moviesToShow}
              onClick={this.handleLikeAndUnlike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={this.PAGE_SIZE}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  movies: state.entities.movies,
  genres: state.entities.genres,
  ui: state.ui,
  getMoviesByTitle: (text) => getMoviesByTitle(text)(state),
  getMoviesByGenre: (genre) => getMoviesByGenre(genre)(state),
});

const mapDispatchToProps = (dispatch) => ({
  getMovies: () => dispatch(async () => await getMovies()),
  getGenres: () => dispatch(async () => await getGenres()),
  moviesLoaded: (data) => dispatch(moviesLoaded({ data })),
  genresLoaded: (data) => dispatch(genresLoaded({ data })),
  movieAdded: (data) => dispatch(movieAdded({ data })),
  movieRemoved: (_id) => dispatch(movieRemoved({ data: { _id } })),
  movieUpdated: (data) => dispatch(movieUpdated({ data })),
  genreSelected: (data) => dispatch(genreSelected({ data })),
  pageSelected: (data) => dispatch(pageSelected({ data })),
  columnSortedBy: (data) => dispatch(columnSortedBy({ data })),
  tableFilteredBy: (data) => dispatch(tableFilteredBy({ data })),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Movies));
