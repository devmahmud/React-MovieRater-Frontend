import React from "react";
import FontAwesome from "react-fontawesome";

function MovieList(props) {
  return (
    <div>
      {props.movies.map(movie => {
        return (
          <div key={movie.id} className="movie-item">
            <h3
              onClick={() => {
                props.movieClicked(movie);
              }}
              style={{ cursor: "pointer" }}
            >
              {movie.title}
            </h3>
            <FontAwesome name="edit" onClick={() => props.onEdit(movie)} />
            <FontAwesome
              name="trash"
              onClick={() => {
                props.onDelete(movie.id);
              }}
            />
          </div>
        );
      })}
      <button onClick={props.addMovie}>Add New</button>
    </div>
  );
}
export default MovieList;
