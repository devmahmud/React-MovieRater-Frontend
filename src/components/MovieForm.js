import React, { useState } from "react";

const MovieForm = ({ movie = {}, cancelEdit, submitMovie }) => {
  const [currentMovie, setCurrentMovie] = useState(movie);

  const inputChange = e => {
    setCurrentMovie({ ...currentMovie, [e.target.name]: e.target.value });
  };

  const submitForm = () => {
    if (currentMovie.title !== "" && currentMovie.description !== "") {
      submitMovie(currentMovie);
    }
  };

  return (
    <React.Fragment>
      <span>Title</span>
      <br />
      <input
        type="text"
        name="title"
        value={currentMovie.title}
        onChange={inputChange}
      />
      <br />
      <span>Description</span>
      <br />
      <textarea
        name="description"
        onChange={inputChange}
        value={currentMovie.description}
      />
      <br />
      <button onClick={submitForm}>Save</button>&nbsp;
      <button onClick={cancelEdit}>Cancel</button>
    </React.Fragment>
  );
};

export default MovieForm;
