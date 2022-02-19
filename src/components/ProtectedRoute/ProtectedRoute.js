import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props }) => {
  if (props.loggedIn !== null) {
    return (
  <Route>
    {() => (props.loggedIn === true ? <Component {...props} /> : <Redirect push to="/" />)}
  </Route>
    );
  }
  return null;
};

export default ProtectedRoute;