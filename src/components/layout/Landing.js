import React from 'react';
import { Link } from 'react-router-dom';
import useUserContext from '../../hooks/useUserContext';

const Landing = () => {
  const { state } = useUserContext();

  return (
    <div className="landing">
      <div className="dark-overlay landing-inner text-light">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="display-3 mb-4">Developer Connector</h1>
              <p className="lead">
                {' '}
                Create a developer profile/portfolio, share posts and get help
                from other developers
              </p>
              <hr />
              {state.isAuth ? (
                <Link to="/dashboard" className="btn btn-lg btn-info mr-2">
                  Dashboard
                </Link>
              ) : (
                <div>
                  <Link to="/register" className="btn btn-lg btn-info mr-2">
                    Sign Up
                  </Link>
                  <Link to="/login" className="btn btn-lg btn-light">
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
