import React, { useState, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Users from './user/pages/Users';
import Auth from './user/pages/Auth';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
import EditCV from './CV/pages/EditCv';
import ViewCV from './CV/pages/ViewCV';

const App = () => {
  let loggedIn = localStorage.getItem("portfolio-builder")
  console.log(!!loggedIn);
  const [isLoggedIn, setIsLoggedIn] = useState(!!loggedIn);
  const [userId, setUserId] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(!!loggedIn);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("portfolio-builder")
    setIsLoggedIn(!!loggedIn);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/edit" exact>
          <EditCV />
        </Route>
        <Route path="/see" exact>
          <ViewCV />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Auth />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
