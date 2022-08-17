import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import TextFieldGroup from '../common/TextFieldGroup';

import useUserContext from '../../hooks/useUserContext';
import axios from 'axios';

const Register = function () {
  const navigate = useNavigate();
  const { state: userState } = useUserContext();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const { mutate } = useMutation(
    async (registerData) => {
      return await axios.post(
        'https://dev-connect-public-be.herokuapp.com/api/auth/register',
        registerData
      );
    },
    {
      onSuccess: () => {
        navigate('/login');
      },
      onError: (error) => {
        setErrors(error.response?.data);
      },
    }
  );

  const formSubmit = (e) => {
    e.preventDefault();
    mutate({ name, email, password, confirmPassword });
  };

  if (userState.isAuth) {
    navigate('/dashboard');
  }

  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Create your DevConnector account</p>
            <form onSubmit={formSubmit}>
              <TextFieldGroup
                name="name"
                placeholder="Name"
                error={errors.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
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
              <TextFieldGroup
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                error={errors.confirmPassword}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
