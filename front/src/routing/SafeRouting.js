import { Redirect, Route } from "react-router-dom";
import decode from "jwt-decode";

const checkAuth = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  try {
    const { exp } = decode(token);

    if (exp * 1000 < new Date().getTime()) {
      localStorage.removeItem("token");
      return false;
    } else {
      return true;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        checkAuth() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};
export const HideRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !checkAuth() ? <Component {...props} /> : <Redirect to="/contacts" />
      }
    />
  );
};
