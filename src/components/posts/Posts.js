import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import Spinner from '../common/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import useUserContex from '../../hooks/useUserContext';

const Posts = function () {
  const navigate = useNavigate();
  const { state: userState } = useUserContex();

  const { isLoading, data } = useQuery(['post', 'all'], async () => {
    return await axios.get(
      'https://dev-connect-public-be.herokuapp.com/api/post/all'
    );
  });

  // Redirect if someone tries to access this componenet without being authenticated
  useEffect(() => {
    if (!userState.isAuth) {
      navigate('/');
    }
  }, [userState, navigate]);

  let dispayPosts;
  if (isLoading) {
    dispayPosts = <Spinner />;
  } else if (data.data.length === 0) {
    dispayPosts = <p>There are no posts</p>;
  } else {
    dispayPosts = data.data.map((post) => (
      <PostItem key={post._id} post={post} />
    ));
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <PostForm />
          {dispayPosts}
        </div>
      </div>
    </div>
  );
};

export default Posts;
