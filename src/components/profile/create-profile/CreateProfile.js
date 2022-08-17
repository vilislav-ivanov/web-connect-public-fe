import React, { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { Link, useNavigate } from 'react-router-dom';

import TextFieldGroup from '../../common/TextFieldGroup';
import AreaFieldGroup from '../../common/AreaFieldGroup';
import SelectListGroup from '../../common/SelectListGroup';
import InputGroup from '../../common/InputGroup';

import useUserContext from '../../../hooks/useUserContext';

import axios from 'axios';

const options = [
  { label: '* Select Professional Status', value: null },
  { label: 'Developer', value: 'Developer' },
  { label: 'Junior Developer', value: 'Junior Developer' },
  { label: 'Senior Developer', value: 'Senior Developer' },
  { label: 'Manager', value: 'Manager' },
  { label: 'Student or Learning', value: 'Student or Learning' },
  { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
  { label: 'Intern', value: 'Intern' },
  { label: 'Other', value: 'Other' },
];

const CreateProfile = function () {
  const { state: userState } = useUserContext();
  const navigate = useNavigate();

  const [displaySocial, setDisplaySocial] = useState(false);
  const [handle, setHandle] = useState('');
  const [company, setCompany] = useState('');
  const [website, setWebsite] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('');
  const [skills, setSkills] = useState('');
  const [bio, setBio] = useState('');
  const [githubusername, setGithubusername] = useState('');
  const [twitter, setTwitter] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [youtube, setYoutube] = useState('');
  const [errors, setErrors] = useState({ handle: '', skills: '', status: '' });

  const { isError, mutate, error } = useMutation(
    async (profileData) => {
      return await axios.post('/api/profile', profileData);
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

  // Redirect if someone tries to access this componenet without being authenticated
  useEffect(() => {
    if (!userState.isAuth) {
      navigate('/');
    }
  }, [userState.isAuth, navigate]);

  const onSubmit = function (e) {
    e.preventDefault();
    mutate({
      handle,
      company,
      website,
      location,
      status,
      skills,
      bio,
      githubusername,
      twitter,
      facebook,
      instagram,
      linkedin,
      youtube,
    });
  };

  let socialInputs;

  if (displaySocial) {
    socialInputs = (
      <div>
        <InputGroup
          placeholder="Twitter Profile URL"
          name="twitter"
          icon="fab fa-twitter"
          value={twitter}
          onChange={(e) => setTwitter(e.target.value)}
          error={false}
        />
        <InputGroup
          placeholder="Facebook Profile URL"
          name="facebook"
          icon="fab fa-facebook"
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
          error={false}
        />
        <InputGroup
          placeholder="Linkedin Profile URL"
          name="linkedin"
          icon="fab fa-linkedin"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
          error={false}
        />
        <InputGroup
          placeholder="Instagram Profile URL"
          name="instagram"
          icon="fab fa-instagram"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
          error={false}
        />
        <InputGroup
          placeholder="Youtube Profile URL"
          name="youtube"
          icon="fab fa-youtube"
          value={youtube}
          onChange={(e) => setYoutube(e.target.value)}
          error={false}
        />
      </div>
    );
  } else {
    socialInputs = null;
  }

  return (
    <div className="create-profile">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Dashboard
            </Link>
            <h1 className="display-4 text-center">Create Your Profile</h1>
            <p className="lead text-center">
              Let's get some information to make your profile stand out
            </p>
            <small className="d-block pb-3">* = required field</small>
            <form action="add-experience" onSubmit={onSubmit}>
              <TextFieldGroup
                name="handle"
                placeholder="* Handle"
                value={handle}
                error={errors.handle}
                info="A unique handle for your profile URL. Your full name, company name, nickname"
                // disabled={edit}
                onChange={(e) => setHandle(e.target.value)}
              />
              <SelectListGroup
                name="status"
                value={status}
                options={options}
                error={errors.status}
                info="Give us an idea of where you are at in your career"
                onChange={(e) => setStatus(e.target.value)}
              />
              <TextFieldGroup
                name="company"
                placeholder="Company"
                value={company}
                error={false}
                info="Could be your own company or one you work for"
                onChange={(e) => setCompany(e.target.value)}
              />
              <TextFieldGroup
                name="website"
                placeholder="Website"
                value={website}
                error={false}
                info="Could be your own website or a company one"
                onChange={(e) => setWebsite(e.target.value)}
              />
              <TextFieldGroup
                name="location"
                placeholder="Location"
                value={location}
                error={false}
                info="City or city & state suggested (eg. Boston, MA)"
                onChange={(e) => setLocation(e.target.value)}
              />
              <TextFieldGroup
                name="skills"
                placeholder="*Skills"
                value={skills}
                error={errors.skills}
                info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP"
                onChange={(e) => setSkills(e.target.value)}
              />
              <TextFieldGroup
                name="githubusername"
                placeholder="Githubusername"
                value={githubusername}
                error={isError && error.githubusername}
                info="If you want your latest repos and a Github link, include your username"
                onChange={(e) => setGithubusername(e.target.value)}
              />
              <AreaFieldGroup
                name="bio"
                placeholder="Bio"
                value={bio}
                error={isError && error.bio}
                info="Tell us a little about yourself"
                onChange={(e) => setBio(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-light"
                onClick={() => setDisplaySocial(!displaySocial)}
              >
                Add Social Network Links
              </button>
              {socialInputs}
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
