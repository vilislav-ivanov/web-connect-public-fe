import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useUserContext from '../../hooks/useUserContext';

import './Navigation.css';

const Navigation = function () {
  const { state, dispatch } = useUserContext();
  const navigate = useNavigate();

  const onLogoutClick = (e) => {
    e.preventDefault();
    sessionStorage.removeItem('token');
    dispatch({ type: 'logout' });
    // this.props.history.push('/');
    navigate('/');
  };

  const userLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/dashboard">
          Dashboard
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/posts">
          Posts
        </Link>
      </li>
      <li className="nav-item">
        <a href="/logout" onClick={onLogoutClick} className="nav-link">
          {/* <img
            className="rounded-circle"
            // src={user.email}
            alt={user.name}
            style={{ width: '25px', marginRight: '5px' }}
            title="You must have a Gravatar connected to your email to display an image"
          />{' '} */}
          Logout
        </a>
      </li>
    </ul>
  );

  const guessLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          Sign Up
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">
          DevConnector
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mobile-nav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mobile-nav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/profiles">
                {' '}
                Developers
              </Link>
            </li>
          </ul>
          {state.isAuth ? userLinks : guessLinks}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
