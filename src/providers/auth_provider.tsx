import React, { useState } from 'react';
import { JwtPayload } from 'jwt-decode';
import Auth from '../models/auth';

const AuthContext = React.createContext<Auth | null>(null);
const UserContext = React.createContext<JwtPayload | null>(null);

type AuthProviderProps = {
  service: Auth;
  children?: React.ReactNode;
};

const AuthProvider: React.FC<AuthProviderProps> = ({ service, children }) => {
  const [userService, setUserService] = useState(service || new Auth());

  userService.onUserChange = (newUser: JwtPayload | null) =>
    newUser && setUserService(new Auth(newUser));

  return (
    <AuthContext.Provider value={userService}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext, UserContext };
