import React from 'react';
import { useQuery } from '@tanstack/react-query';
import ProfileItem from './ProfileItem/ProfileItem';
import Spinner from '../common/Spinner';

import axios from 'axios';

const Profiles = function () {
  const { isLoading, data } = useQuery(['profiles'], async () => {
    return await axios.get(
      'https://dev-connect-public-be.herokuapp.com/api/profile/all/'
    );
  });

  let displayAllProfiles;

  if (isLoading) {
    displayAllProfiles = <Spinner />;
  } else {
    displayAllProfiles = data.data.map((profile) => (
      <ProfileItem key={profile._id} profile={profile} />
    ));
  }

  return (
    <div className="profiles">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4 text-center">Developer Profiles</h1>
            <p className="lead text-center">
              Browse and connect with developers
            </p>
            {displayAllProfiles}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiles;
