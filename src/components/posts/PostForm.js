import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import TextFieldGroup from '../common/TextFieldGroup';

import axios from 'axios';

import useUserContext from '../../hooks/useUserContext';

function PostForm() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { state: userState } = useUserContext();

  const [post, setPost] = useState('');
  const [errors, setErrors] = useState({});

  const { mutate } = useMutation(
    (post) => {
      return axios.post('api/post', { text: post });
    },
    {
      onSuccess: (newData) => {
        console.log('Post created, response from server: ', newData);
        queryClient.setQueryData(['post', 'all'], (oldData) => {
          return {
            ...oldData,
            data: [...oldData.data, newData.data],
          };
        });
      },
      onError: (error) => {
        console.log('error data ', error.response.data);
        setErrors({ ...error.response.data });
      },
    }
  );

  useEffect(() => {
    if (!userState.isAuth) {
      navigate('/');
    }
  }, [userState, navigate]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    mutate(post);
    setPost('');
  };

  return (
    <div className="post-form mb-3">
      <div className="card card-info">
        <div className="card-header bg-info text-white">Create a new post</div>
        <div className="card-body">
          <form onSubmit={onFormSubmit}>
            <TextFieldGroup
              name="text"
              value={post}
              onChange={(e) => setPost(e.target.value)}
              placeholder="Post..."
              error={errors && errors.text}
            />
            <button
              type="submit"
              className="btn btn-primary"
              onClick={onFormSubmit}
            >
              Submit
            </button>
            {errors.profile && (
              <div className="d-flex">
                <div className="text-danger py-3">
                  No profile, please create one:{' '}
                </div>
                <Link className="py-3 pl-2" to="/create-profile">
                  Link
                </Link>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostForm;
