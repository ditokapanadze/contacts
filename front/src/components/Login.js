import React, { useState } from "react";
import "./login.css";
import { useDispatch } from "react-redux";
import { login } from "../actions/authActions";
import { useHistory, Link } from "react-router-dom";
import Input from "./Input";

function Login() {
  const isFatching = false;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  let history = useHistory();
  const loginHandler = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    dispatch(login(user, history));
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginRight">
          {" "}
          <form className="registerBox">
            <Input
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* <input required className="loginInput" /> */}
            {/* <span style={{ color: "red", fontSize: "22px" }}> </span> */}

            <Input
              type="password"
              minLength="6"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <input
              required
              type="password"
              minLength="6"
              placeholder="Password"
              className="loginInput"
            /> */}
            <button
              className="loginButton"
              type="submit"
              onClick={loginHandler}
            >
              {isFatching ? "" : "Log In"}
            </button>
            <Link to="/register">
              <div className="loginRegisterButton new__btn">
                {" "}
                {isFatching ? "" : "Create a new account"}
              </div>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
