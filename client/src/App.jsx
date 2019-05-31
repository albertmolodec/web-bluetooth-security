import React from 'react';
import StoreContext from 'storeon/react/context';
import store from './store';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

// Pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import NoMatch from './pages/Page404';

// Components
import Main from './components/Main';
import PrivateRoute from './components/PrivateRoute';

function AppRouter() {
  return (
    <StoreContext.Provider value={store}>
      <Router>
        <Main>
          <Switch>
            <Redirect from="/" exact to="/dashboard" />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <PrivateRoute path="/dashboard" exact component={Dashboard} />
            <Route component={NoMatch} />
          </Switch>
        </Main>
      </Router>
    </StoreContext.Provider>
  );
}

export default AppRouter;
