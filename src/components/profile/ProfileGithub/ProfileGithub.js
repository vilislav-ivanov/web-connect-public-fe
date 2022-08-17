import React from 'react';
import { useQuery } from '@tanstack/react-query';

import Spinner from '../../common/Spinner';
import axios from 'axios';

export const ProfileGithub = function ({ profile }) {
  const { isLoading } = useQuery(
    ['github', profile.githubusername],
    async () => {
      return await axios.get(
        `https://api.github.com/users/${profile.githubusername}`,
        {
          headers: {
            'User-Agent': 'vilislav-ivanov',
          },
        }
      );
    }
  );

  if (isLoading) {
    return <Spinner />;
  }
  let reposDisplay = <div>No repos</div>;
  // if (repos && repos.length > 0) {
  //   reposDisplay = repos.map((repo) => <UserRepo key={repo.url} repo={repo} />);
  // }
  return (
    <div>
      <hr />
      <h3 className="mb-4">Latest Github Repos</h3>
      {reposDisplay}
    </div>
  );
};

export default ProfileGithub;
