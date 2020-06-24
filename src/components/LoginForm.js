import React from "react";
import PropTypes from "prop-types";

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <div className="loginForm">
      <h2 className="loginTitle">Login Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Username:{" "}
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            required
            className="input"
          />
        </div>
        <div>
          Password:{" "}
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
            className="input"
          />
        </div>
        <button type="submit" className="log">
          Login
        </button>
      </form>
    </div>
  );
};

LoginForm.prototype = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default LoginForm;
