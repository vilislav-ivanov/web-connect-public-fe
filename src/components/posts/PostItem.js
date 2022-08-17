import React, { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';

import PostActions from './PostActions';
import useUserContext from '../../hooks/useUserContext';
import axios from 'axios';

import anon from '../../img/anon.png';

function PostItem({ post }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { state: userState } = useUserContext();

  const { mutate: mutateLike } = useMutation(
    async (postId) => {
      return await axios.post(
        `https://dev-connect-public-be.herokuapp.com/api/post/like/${postId}`
      );
    },
    {
      onSuccess: (newData) => {
        queryClient.setQueryData(['post', 'all'], (oldData) => {
          return {
            ...oldData,
            data: oldData.data.map((dataItem) => {
              if (dataItem._id === post._id) {
                dataItem.likes = newData.data.likes;
              }
              return dataItem;
            }),
          };
        });
      },
    }
  );

  const { mutate: mutateUnlike } = useMutation(
    async (postId) => {
      return await axios.post(
        `https://dev-connect-public-be.herokuapp.com/api/post/unlike/${postId}`
      );
    },
    {
      onSuccess: (newData) => {
        queryClient.setQueryData(['post', 'all'], (oldData) => {
          return {
            ...oldData,
            data: oldData.data.map((dataItem) => {
              if (dataItem._id === post._id) {
                dataItem.likes = newData.data.likes;
              }
              return dataItem;
            }),
          };
        });
      },
    }
  );

  const { mutate: mutateDelete } = useMutation(
    async (postId) => {
      return await axios.delete(
        `https://dev-connect-public-be.herokuapp.com/api/post/${postId}`
      );
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData(['post', 'all'], (oldData) => {
          return {
            ...oldData,
            data: oldData.data.filter((p) => p._id !== post._id),
          };
        });
      },
    }
  );

  useEffect(() => {
    if (!userState.isAuth) {
      navigate('/');
    }
  }, [userState, navigate]);

  const checkIfUserLikedPost = () => {
    const indexOfUserInLikesArr = post.likes.findIndex(
      (like) => like.user === userState.user.id
    );
    return indexOfUserInLikesArr >= 0;
  };

  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-2">
          {post.profileExist ? (
            <Link to={`/profile/${post.userHandle}`}>
              <img
                className="rounded d-md-block"
                src={
                  post.profile.image
                    ? `https://dev-connect-public-be.herokuapp.com/uploads/${post.profile.image}`
                    : anon
                }
                alt={post.userEmail}
              />
              <br />
              {/* <p className="text-center">{post.userEmail}</p> */}
            </Link>
          ) : (
            <img className="rounded d-md-block" src={anon} alt="anon" />
          )}
        </div>
        <div className="col-md-10">
          <p className="lead">{post.text}</p>
          <PostActions
            isAuthor={post.user === userState.user.id}
            // isAuthor={false}
            onDeleteClick={() => mutateDelete(post._id)}
            onLikeClicked={() => mutateLike(post._id)}
            onUnlikeClicked={() => mutateUnlike(post._id)}
            likesCount={post.likes.length}
            disabled={checkIfUserLikedPost()}
          />
          <Link to={`/post/${post._id}`} className="btn btn-info">
            See Comments
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PostItem;
