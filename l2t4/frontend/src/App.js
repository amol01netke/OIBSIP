import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route
          path="/home"
          exact
          render={() => <Home setIsLoggedIn={setIsLoggedIn} />}
        />
        <Redirect to="/home" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route
          path="/login"
          exact
          render={() => <Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/sign-up"
          exact
          render={() => <SignUp setIsLoggedIn={setIsLoggedIn} />}
        />
        <Redirect to="/login" />
      </Switch>
    );
  }

  return (
    <Router>
      <Header />
      <div className="App">{routes}</div>
      <Footer />
    </Router>
  );
};

export default App;
