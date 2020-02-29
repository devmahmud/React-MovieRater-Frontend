import React, { useState, useEffect } from "react";
import FontAwesome from "react-fontawesome";
import { withCookies } from "react-cookie";
import "./App.css";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import MovieForm from "./components/MovieForm";

function App(props) {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState();
  const [selectEditmovie, setSelectEditmovie] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const token = props.cookies.get("mr-token");

  useEffect(() => {
    if (token !== "undefined") {
      loadMovies();
    } else {
      props.history.push("/");
    }
    // eslint-disable-next-line
  }, []);

  const loadMovies = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/movies/`, {
      method: "GET",
      headers: {
        Authorization: `token ${token}`
      }
    })
      .then(resp => resp.json())
      .then(data => setMovies(data))
      .catch(err => {
        console.log(err);
      });
  };

  const loadMovie = movie => {
    setSelectedMovie(movie);
  };
  const deleteMovie = id => {
    fetch(`${process.env.REACT_APP_API_URL}/api/movies/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `token ${token}`
      }
    })
      .then(resp => {
        const updated_movies = movies.filter(movie => movie.id !== id);
        setMovies(updated_movies);
        setSelectedMovie(null);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const editMovie = movie => {
    setSelectEditmovie(movie);
    setIsEdit(true);
  };

  const addMovie = () => {
    setSelectEditmovie({ title: "", description: "" });
    setIsEdit(true);
  };

  const submitMovie = movie => {
    if (movie.id) {
      fetch(`${process.env.REACT_APP_API_URL}/api/movies/${movie.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`
        },
        body: JSON.stringify(movie)
      })
        .then(resp => resp.json())
        .then(data => {
          loadMovies();
          loadMovie(data);
          setIsEdit(false);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      fetch(`${process.env.REACT_APP_API_URL}/api/movies/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`
        },
        body: JSON.stringify(movie)
      })
        .then(resp => {
          loadMovies();
          setIsEdit(false);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const cancelEdit = () => {
    setIsEdit(false);
  };
  return (
    <div className="App">
      <h1>
        <FontAwesome name="film" />
        Movie Rater
      </h1>
      <div className="layout">
        <MovieList
          movies={movies}
          movieClicked={loadMovie}
          onDelete={deleteMovie}
          onEdit={editMovie}
          addMovie={addMovie}
        />
        <div>
          {isEdit ? (
            <MovieForm
              movie={selectEditmovie}
              cancelEdit={cancelEdit}
              submitMovie={submitMovie}
            />
          ) : (
            <MovieDetails
              movie={selectedMovie}
              updateMovie={loadMovie}
              token={token}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default withCookies(App);
