import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import setAuthToken from '../../utils/setAuthToken';
import TextFieldGroup from '../common/TextFieldGroup';
import useUserContext from '../../hooks/useUserContext';

function Login() {
  const navigate = useNavigate();
  const { dispatch } = useUserContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const { mutate } = useMutation(
    ({ email, password }) => {
      return axios.post(
        'https://dev-connect-public-be.herokuapp.com/api/auth/login',
        { email, password }
      );
    },
    {
      onSuccess: ({ data }) => {
        const { token } = data;
        const payload = jwtDecode(token);
        // // Add token to session storage
        sessionStorage.setItem('token', token);
        // Add token to axios authorization header
        setAuthToken(token);
        dispatch({ type: 'login', payload });
        const logoutAfter = (payload.exp - Date.now() / 1000) * 1000;

        setTimeout(() => {
          // logout
          sessionStorage.removeItem('token');
          dispatch({ type: 'logout' });
        }, logoutAfter);
        // Redirect after login
        navigate('/dashboard');
      },
      onError: (error) => {
        setErrors(error.response?.data);
      },
    }
  );

  const submitForm = (e) => {
    e.preventDefault();
    mutate({ email, password });
  };

  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <p className="lead text-center">
              Sign in to your DevConnector account
            </p>
            <form onSubmit={submitForm}>
              <TextFieldGroup
                name="email"
                placeholder="Email"
                error={errors.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextFieldGroup
                name="password"
                type="password"
                placeholder="Password"
                error={errors.password}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
