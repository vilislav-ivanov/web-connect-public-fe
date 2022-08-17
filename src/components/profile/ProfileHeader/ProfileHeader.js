import React from 'react';
import anon from '../../../img/anon.png';

const ProfileHeader = ({ profile }) => {
  const dispalyCompany = profile.company ? ` at ${profile.company}` : null;
  const dispalyLocation = profile.location ? profile.location : null;
  let displayWebsite;
  let displayFacebook;
  let displayTwitter;
  let displayLinkedin;
  let displayInstagram;
  let displayYoutube;

  if (profile.website) {
    displayWebsite = (
      <a
        className="text-white p-2"
        target="_blank"
        rel="noopener noreferrer"
        href={`http://${profile.website}`}
      >
        <i className="fas fa-globe fa-2x"></i>
      </a>
    );
  }

  if (profile.social?.facebook) {
    displayFacebook = (
      <a
        className="text-white p-2"
        target="_blank"
        rel="noopener noreferrer"
        href={`http://${profile.social.facebook}`}
      >
        <i className="fab fa-facebook fa-2x"></i>
      </a>
    );
  }

  if (profile.social?.twitter) {
    displayTwitter = (
      <a
        className="text-white p-2"
        target="_blank"
        rel="noopener noreferrer"
        href={`http://${profile.social.twitter}`}
      >
        <i className="fab fa-twitter fa-2x"></i>
      </a>
    );
  }

  if (profile.social?.linkedin) {
    displayLinkedin = (
      <a
        className="text-white p-2"
        target="_blank"
        rel="noopener noreferrer"
        href={`http://${profile.social.linkedin}`}
      >
        <i className="fab fa-linkedin fa-2x"></i>
      </a>
    );
  }

  if (profile.social?.instagram) {
    displayInstagram = (
      <a
        className="text-white p-2"
        target="_blank"
        rel="noopener noreferrer"
        href={`http://${profile.social.instagram}`}
      >
        <i className="fab fa-instagram fa-2x"></i>
      </a>
    );
  }

  if (profile.social?.youtube) {
    displayYoutube = (
      <a
        className="text-white p-2"
        target="_blank"
        rel="noopener noreferrer"
        href={`http://${profile.social.instagram}`}
      >
        <i className="fab fa-youtube fa-2x"></i>
      </a>
    );
  }

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-body bg-info text-white mb-3">
          <div className="row">
            <div className="col-4 col-md-3 m-auto">
              <img
                className="rounded"
                src={profile.image ? `/uploads/${profile.image}` : anon}
                alt={profile.handle}
              />
            </div>
          </div>
          <div className="text-center">
            <h1 className="display-4 text-center">{profile.user.name}</h1>
            <p className="lead text-center">
              {profile.status}
              {dispalyCompany}
            </p>
            <p>{dispalyLocation}</p>
            <p>
              {displayWebsite}
              {displayFacebook}
              {displayTwitter}
              {displayLinkedin}
              {displayInstagram}
              {displayYoutube}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
