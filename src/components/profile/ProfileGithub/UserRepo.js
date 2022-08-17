import React from 'react';
import { Link } from 'react-router-dom';

const UserRepo = ({ repo }) => {
  const { name, stars, watchers, descriptions, url } = repo;
  return (
    <div className="card card-body mb-2">
      <div className="d-flex justify-content-between">
        <div className="">
          <h4>
            <Link to={{ pathname: url }} className="text-info" target="_blank">
              {name}
            </Link>
          </h4>
          <p>{descriptions}</p>
        </div>
        <div className="">
          <span className="badge badge-info mr-1">Stars: {stars}</span>
          <span className="badge badge-secondary mr-1">
            Watchers: {watchers}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserRepo;
