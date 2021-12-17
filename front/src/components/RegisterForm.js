import React, { useState } from "react";
import Input from "./Input";
import "./registerForm.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signup } from "../actions/authActions";
import { Link, useHistory } from "react-router-dom";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [repassword, setRepassword] = useState();
  const [passError, setPasseror] = useState(false);
  const [nameError, setNameError] = useState(false);
  const dispatch = useDispatch();
  let history = useHistory();
  const registerHandler = async (e) => {
    e.preventDefault();
    if (repassword !== password) {
      setPasseror(true);
      return;
    } else if (repassword === password) {
      setPasseror(false);
    }
    if (username.length < 2) {
      setNameError(true);
      return;
    } else {
      setNameError(false);
    }
    const user = {
      username,
      email,
      password,
    };
    dispatch(signup(user, history));
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginRight">
          <form className="registerBox" onSubmit={registerHandler}>
            <Input
              type="text"
              nameError={nameError}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            {nameError ? (
              <span style={{ color: "red" }}>
                user name must me more then two characters
              </span>
            ) : (
              ""
            )}
            <Input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />{" "}
            <Input
              placeholder="Password"
              type="password"
              onChange={(e) => setpassword(e.target.value)}
            />
            {passError ? (
              <span style={{ color: "red" }}>passwords do not match</span>
            ) : (
              ""
            )}
            <Input
              type="password"
              passError={passError}
              placeholder="Repeat password"
              onChange={(e) => setRepassword(e.target.value)}
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            {/* <div className="loginRegisterButton">Log into account</div> */}
            <p style={{ textAlign: "center", marginTop: "20px" }}>
              Alreday a memebr? <Link to="/login">Sign in</Link>{" "}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
