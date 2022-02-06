import React from "react";
import { toast } from "react-toastify";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      numberInStock: "",
      dailyRentalRate: "",
      genreId: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    numberInStock: Joi.number()
      .integer()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number().min(0).max(10).label("Rate"),
    genreId: Joi.string().required().label("Genre"),
  };

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;
      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (error) {
      if (error.response && error.response.status === 404)
        this.props.history.replace("/notfound");
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = async () => {
    const originalData = this.state.data;
    try {
      await saveMovie(this.state.data);
      this.props.history.push("/movies");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("The movie with the given ID was not found.");
      }
      this.setState({ data: originalData });
    }
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect(this.state.genres, "genreId", "Genre")}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
