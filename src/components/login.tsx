import React, { useContext, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';

import { AuthContext } from '../providers/auth_provider';

const Login = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (auth?.isAuthenticated()) {
    return <Redirect to="/" />;
  }

  const login = () => {
    const backend_url = process.env.REACT_APP_BACKEND_URL;

    axios({
      method: 'post',
      url: backend_url + '/login',
      data: {
        user: {
          email: email,
          password: password
        }
      }
    })
      .then((response) => {
        const token = response.data.jwt;
        auth?.setToken(token);
        history.push('/');
      })
      .catch((error) => console.log(error));
  };

  return (
    <form>
      <div>
        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="button" onClick={login}>
        Login
      </button>
    </form>
  );
};

export default Login;
