import React, { useState } from "react";
import FontAwesome from "react-fontawesome";

const MovieDetails = props => {
  const [highlighted, setHiglighted] = useState(-1);

  const highlightRate = high => {
    setHiglighted(high);
  };

  const rateClicked = stars => {
    fetch(
      `${process.env.REACT_APP_API_URL}/api/movies/${props.movie.id}/rate_movie/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${props.token}`
        },
        body: JSON.stringify({ stars: stars + 1 })
      }
    )
      .then(resp => resp.json())
      .then(data => {
        getDetails();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getDetails = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/movies/${props.movie.id}/`, {
      method: "GET",
      headers: {
        Authorization: `token ${props.token}`
      }
    })
      .then(resp => resp.json())
      .then(data => props.updateMovie(data))
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      {props.movie && (
        <div>
          <h3>{props.movie.title}</h3>
          <FontAwesome
            name="star"
            className={props.movie.avg_rating > 0 ? "orange" : ""}
          />
          <FontAwesome
            name="star"
            className={props.movie.avg_rating > 1 ? "orange" : ""}
          />
          <FontAwesome
            name="star"
            className={props.movie.avg_rating > 2 ? "orange" : ""}
          />
          <FontAwesome
            name="star"
            className={props.movie.avg_rating > 3 ? "orange" : ""}
          />
          <FontAwesome
            name="star"
            className={props.movie.avg_rating > 4 ? "orange" : ""}
          />
          ({props.movie.no_of_ratings})<p>{props.movie.description}</p>
          <div className="rate-container">
            <h2>Rate it !!!</h2>
            {[...Array(5)].map((e, i) => {
              return (
                <FontAwesome
                  key={i}
                  name="star"
                  className={highlighted > i - 1 ? "purple" : ""}
                  onMouseEnter={() => {
                    highlightRate(i);
                  }}
                  onMouseLeave={() => {
                    highlightRate(-1);
                  }}
                  onClick={() => {
                    rateClicked(i);
                  }}
                />
              );
            })}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default MovieDetails;
