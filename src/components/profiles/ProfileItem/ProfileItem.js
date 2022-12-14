import React from 'react';
import { Link } from 'react-router-dom';
import anon from '../../../img/anon.png';

const ProfileItem = ({ profile }) => {
  const skillsDisplay = profile.skills.slice(0, 5).map((skill) => (
    <li key={skill} className="list-group-item">
      <i className="fa fa-check pr-1"></i>
      {skill}
    </li>
  ));

  return (
    <div className="card card-body bg-light mb-3">
      <div className="row">
        <div className="col-2">
          <img
            className="rounded"
            src={
              profile.image
                ? `https://dev-connect-public-be.herokuapp.com/uploads/${profile.image}`
                : anon
            }
            alt=""
          />
        </div>
        <div className="col-lg-6 col-md-4 col-8">
          <h3>{profile.user.name}</h3>
          <p>
            {profile.status} at {profile.company ? profile.company : 'n/a'}
          </p>
          <p>{profile.location ? profile.location : 'Location not added'}</p>
          <Link to={`/profile/${profile.handle}`} className="btn btn-info">
            View Profile
          </Link>
        </div>
        <div className="col-md-4 d-none d-lg-block">
          <h4>Skill Set</h4>
          <ul className="list-group">{skillsDisplay}</ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileItem;
