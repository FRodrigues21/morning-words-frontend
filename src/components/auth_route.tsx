import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { AuthContext } from '../providers/auth_provider';

const AuthRoute = (props: any) => {
  const auth = useContext(AuthContext);

  return auth?.isAuthenticated() ? (
    <Route {...props} />
  ) : (
    <Redirect to="/login" />
  );
};

export default AuthRoute;
