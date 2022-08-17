import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams, useNavigate } from 'react-router-dom';

import ProfileHeader from './ProfileHeader/ProfileHeader';
import ProfileAbout from './ProfileAbout/ProfileAbout';
import ProfileCreds from './ProfileCreds/ProfileCreds';
// import ProfileGithub from './ProfileGithub/ProfileGithub';
import Spinner from '../common/Spinner';

import axios from 'axios';

const Profile = function () {
  const { handle } = useParams();
  const navigate = useNavigate();

  const { isLoading, data } = useQuery(['profile', handle], async () => {
    return await axios.get(
      `https://dev-connect-public-be.herokuapp.com/api/profile/handle/${handle}`
    );
  });

  useEffect(() => {
    if (!handle) {
      navigate('/');
    }
  }, [handle, navigate]);

  let displayProfile;

  if (isLoading) {
    displayProfile = <Spinner />;
  } else {
    displayProfile = (
      <div>
        <ProfileHeader profile={data.data} />
        <ProfileAbout profile={data.data} />
        <ProfileCreds profile={data.data} />
        {/* <ProfileGithub profile={data.data} /> */}
      </div>
    );
  }
  return (
    <div className="profile">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-6">
                <Link to="/profiles" className="btn btn-light mb-3 float-left">
                  Back To Profiles
                </Link>
              </div>
              <div className="col-6"></div>
            </div>
            {displayProfile}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
