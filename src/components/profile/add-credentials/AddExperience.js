import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import TextFieldGroup from '../../common/TextFieldGroup';
import AreaFieldGroup from '../../common/AreaFieldGroup';
import useUserContext from '../../../hooks/useUserContext';

const AddExperience = function () {
  const navigate = useNavigate();

  const { state: userState } = useUserContext();
  const { mutate } = useMutation(
    async (experience) => {
      return await axios.post('/api/profile/experience', experience);
    },
    {
      onSuccess: (data) => {
        navigate('/dashboard');
      },
      onError: (error) => {
        setErrors({
          ...error.response.data,
        });
      },
    }
  );

  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [current, setCurrent] = useState(false);
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});

  // Redirect if someone tries to access this componenet without being authenticated
  useEffect(() => {
    if (!userState.isAuth) {
      navigate('/login');
    }
  }, [userState, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();

    mutate({ title, company, location, from, to, description, current });
  };

  return (
    <div className="section add-experience">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
            <h1 className="display-4 text-center">Add Your Experience</h1>
            <p className="lead text-center">
              Add any developer/programming positions that you have had in the
              past
            </p>
            <small className="d-block pb-3">* = required field</small>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                name="title"
                placeholder="* Job Title"
                value={title}
                error={errors.title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextFieldGroup
                name="company"
                placeholder="* Company"
                value={company}
                error={errors.company}
                onChange={(e) => setCompany(e.target.value)}
              />
              <TextFieldGroup
                name="location"
                placeholder="Location"
                value={location}
                error={errors.location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <h6>* From Date</h6>
              <TextFieldGroup
                type="date"
                name="from"
                value={from}
                error={errors.from}
                onChange={(e) => setFrom(e.target.value)}
              />
              {current ? (
                false
              ) : (
                <div>
                  <h6>To Date</h6>
                  <TextFieldGroup
                    type="date"
                    name="to"
                    value={to}
                    error={errors.to}
                    onChange={(e) => setTo(e.target.value)}
                  />
                </div>
              )}
              <div className="form-check mb-4">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="current"
                  value={current}
                  id="current"
                  onClick={(e) => setCurrent(!current)}
                />
                <label className="form-check-label" htmlFor="current">
                  Current Job
                </label>
              </div>
              <AreaFieldGroup
                name="description"
                placeholder="Job Description"
                value={description}
                error={errors.description}
                info="Some of your responsabilities, etc"
                onChange={(e) => setDescription(e.target.value)}
              />
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExperience;
