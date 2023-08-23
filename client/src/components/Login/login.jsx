import React from "react";
import LoginController from "./login-controller";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";

const Login = () => {
  const {
    handleInputChange,
    handleSubmit,
    formData,
    firstErrorFieldName,
    firstErrorFieldRef,
  } = LoginController();
  
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          placeholder="Username"
          ref={firstErrorFieldName === "username" ? firstErrorFieldRef : null}
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
          ref={firstErrorFieldName === "password" ? firstErrorFieldRef : null}
        />
        <button type="submit">Login</button>
        <a href="/sign-up">Create Account</a>
      </form>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default Login;
