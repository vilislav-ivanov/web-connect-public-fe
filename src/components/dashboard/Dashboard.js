import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, QueryCache } from '@tanstack/react-query';

// import { fetchProfile, deleteProfile } from '../../actions/profile';
import Spinner from '../common/Spinner';
import ImageUpload from '../profile/create-profile/ImageUpload';
import ProfileActions from './ProfileActions';
import EducationTable from './EducationTable/EducationTable';
import ExperienceTable from './ExperienceTable/ExperienceTable';
import Modal from '../common/Modal';

import axios from 'axios';

import useUserContext from '../../hooks/useUserContext';

function Dashboard() {
  const { state: userState, dispatch } = useUserContext();
  const queryCache = new QueryCache();
  const navigate = useNavigate();

  const { isLoading, data } = useQuery(['profile'], async () => {
    return await axios.get(
      'https://dev-connect-public-be.herokuapp.com/api/profile'
    );
  });
  const { mutate } = useMutation(
    () => {
      return axios.delete(
        'https://dev-connect-public-be.herokuapp.com/api/profile'
      );
    },
    {
      onSuccess: (data) => {
        dispatch({ type: 'logout' });
        sessionStorage.removeItem('token');
        queryCache.clear();
      },
    }
  );

  let dashboardContent;

  useEffect(() => {
    if (!userState.isAuth) {
      navigate('/');
    }
  }, [userState, navigate]);

  if (isLoading) {
    dashboardContent = <Spinner />;
  } else {
    const userData = data.data;
    const { educations, experiences, handle, newProfile } = userData;
    // Check if profile is empty or not
    if (!newProfile) {
      dashboardContent = (
        <div>
          <p className="lead text-muted">
            Welcome <Link to={`/profile/${handle}`}>{userState.user.name}</Link>
          </p>
          <ImageUpload />
          <ProfileActions />
          {educations.length > 0 ? (
            <EducationTable educations={educations} />
          ) : null}
          {experiences.length > 0 ? (
            <ExperienceTable experiences={experiences} />
          ) : null}
          <div style={{ marginBottom: '60px' }} />
          <Modal
            onConfirm={() => mutate()}
            actionType="delete"
            modalStyle="btn-danger"
            modalTitle="Delete Profile"
            modalBody="Are you sure you want to delete profile?"
          />
        </div>
      );
    } else {
      dashboardContent = (
        <div>
          <h1>No profile</h1>
          <Link to="/create-profile">Create Profile</Link>
        </div>
      );
    }
  }
  return (
    <div className="dashboard">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4">Dashboard</h1>
            {dashboardContent}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
