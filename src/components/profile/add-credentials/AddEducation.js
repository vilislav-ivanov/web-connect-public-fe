import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import TextFieldGroup from '../../common/TextFieldGroup';
import AreaFieldGroup from '../../common/AreaFieldGroup';
import useUserContext from '../../../hooks/useUserContext';
import axios from 'axios';

const AddEducation = function () {
  const navigate = useNavigate();
  const { state: userState } = useUserContext();
  const { mutate } = useMutation(
    async (education) => {
      return await axios.post(
        'https://dev-connect-public-be.herokuapp.com/api/profile/education',
        education
      );
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

  const [school, setSchool] = useState('');
  const [degree, setDegree] = useState('');
  const [fieldofstudy, setFieldofstudy] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [current, setCurrent] = useState(false);
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});

  // Redirect if someone tries to access this componenet without being authenticated
  useEffect(() => {
    if (!userState.isAuth) {
      navigate('/');
    }
  }, [userState, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();

    mutate(
      {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description,
      },
      navigate
    );
  };

  return (
    <div className="section add-experience">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
            <h1 className="display-4 text-center">Add Education</h1>
            <p className="lead text-center">
              Add any school, bootcamp, etc that you have attended
            </p>
            <small className="d-block pb-3">* = required fields</small>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                name="school"
                placeholder="* School Name"
                value={school}
                error={errors.school}
                onChange={(e) => setSchool(e.target.value)}
              />
              <TextFieldGroup
                name="degree"
                placeholder="* Degree"
                value={degree}
                error={errors.degree}
                onChange={(e) => setDegree(e.target.value)}
              />
              <TextFieldGroup
                name="fieldofstudy"
                placeholder="* Fieldofstudy"
                value={fieldofstudy}
                error={errors.fieldofstudy}
                onChange={(e) => setFieldofstudy(e.target.value)}
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
                  onClick={() => setCurrent(!current)}
                />
                <label className="form-check-label" htmlFor="current">
                  Current
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

export default AddEducation;
