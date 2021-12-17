import axios from "axios";
import { returnErrors } from "./errorActions";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./types";

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  const token = getState().auth.token;

  const config = {
    headers: {
      "conent-type": "application/json",
    },
  };

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  axios
    .get("/api/auth/user", config)
    .then((res) => dispatch({ type: USER_LOADED, payload: res.data }))
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: AUTH_ERROR });
    });
};

export const signup = (user, history) => async (dispatch) => {
  dispatch({ type: USER_LOADING });
  try {
    const res = await axios.post("http://localhost:8000/api/auth/signup", user);

    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    history.push("/login");
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};
export const login = (user, history) => async (dispatch) => {
  dispatch({ type: USER_LOADING });
  try {
    const res = await axios.post("http://localhost:8000/api/auth/login", user);

    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    history.push("/contacts");
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};
