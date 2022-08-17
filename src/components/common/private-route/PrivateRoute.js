import React from 'react';
import { connect } from 'react-redux';
import { Route, useNavigate } from 'react-router-dom';

const PrivateRoute = ({ auth, element: Element, ...rest }) => {
  const navigate = useNavigate();
  return auth.isAuth ? (
    <Route {...rest} element={<Element />} />
  ) : (
    navigate('/login')
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
