import React, { useState } from "react";
import { withCookies } from "react-cookie";

const Login = props => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const [isRegister, setIsRegister] = useState(false);

  const inputChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const toggleView = () => {
    setIsRegister(!isRegister);
  };

  const submitForm = () => {
    const { username, password } = credentials;
    if (username !== "" && password !== "") {
      if (isRegister) {
        fetch(`${process.env.REACT_APP_API_URL}/api/users/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(credentials)
        })
          .then(resp => toggleView())
          .catch(err => {
            console.log(err);
          });
      } else {
        fetch(`${process.env.REACT_APP_API_URL}/auth/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(credentials)
        })
          .then(resp => resp.json())
          .then(data => {
            props.cookies.set("mr-token", data.token);
            props.history.push("/movies");
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  };

  return (
    <div className="login-container">
      {isRegister ? <h1>Register</h1> : <h1>Login</h1>}
      <span>Username</span>
      <br />
      <input
        type="text"
        name="username"
        value={credentials.username}
        onChange={inputChange}
      />
      <br />
      <span>Password</span>
      <br />
      <input
        type="password"
        name="password"
        onChange={inputChange}
        value={credentials.password}
      />
      <br />
      {isRegister ? (
        <button onClick={submitForm}>Register</button>
      ) : (
        <button onClick={submitForm}>Login</button>
      )}
      &nbsp;
      {isRegister ? (
        <button onClick={toggleView}>Back to Login </button>
      ) : (
        <button onClick={toggleView}>Create an account</button>
      )}
    </div>
  );
};

export default withCookies(Login);
