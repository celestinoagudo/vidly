import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./common/like";
import Table from "./common/table";
import Button from "./common/button";
import auth from "../services/authService";

class MoviesTable extends Component {
  constructor() {
    super();
    if (auth.getCurrentUser()) {
      this.columns.push(this.likeColumn);
      this.columns.push(this.deleteColumn);
    }
  }
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`} movie={movie}>
          {movie.title}
        </Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
  ];

  deleteColumn = {
    key: "delete",
    content: (movie) => (
      <Button
        btnClass="btn btn-danger btn-sm"
        data={movie}
        onClick={() => {
          this.props.onDelete(movie._id);
        }}
        iconClass="fa fa-trash-o"
      />
    ),
  };

  likeColumn = {
    key: "like",
    content: (movie) => (
      <Like object={movie} onLikeAndUnlike={this.props.onClick} />
    ),
  };

  render() {
    const { movies, sortColumn, onSort } = this.props;
    return (
      <div>
        <Table
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
          data={movies}
        />
      </div>
    );
  }
}

export default MoviesTable;
