import React from 'react';
import './App.css';
import Main from './components/main';
import { AuthProvider } from './providers/auth_provider';
import Auth from './models/auth';

const authService = new Auth();

function App() {
  return (
    <AuthProvider service={authService}>
      <Main />
    </AuthProvider>
  );
}

export default App;
