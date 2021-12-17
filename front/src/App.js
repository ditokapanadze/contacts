import React, { useEffect } from "react";
import "./App.css";
import RegisterForm from "./components/RegisterForm";

import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "./actions/authActions";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Contacts from "./components/contacts/Contacts";
import { PrivateRoute } from "./routing/SafeRouting";
import { HideRoute } from "./routing/SafeRouting";

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => console.log(state));

  // useEffect(() => {
  //   dispatch(loadUser());
  // }, []);
  return (
    <div className="App">
      <Router>
        <Switch>
          {/* <Route path="/login">
            <Login />
          </Route> */}
          <HideRoute path="/login" component={Login} />

          <PrivateRoute path="/contacts" component={Contacts} />
          {/* <Route path="/contacts">
            <Contacts />
          </Route> */}
          <HideRoute path="/" component={RegisterForm} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
