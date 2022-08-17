import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import Moment from 'react-moment';

import axios from 'axios';

import Spinner from '../common/Spinner';
import CommentForm from '../comment/CommentForm';
import CommentList from '../comment/CommentList';
import useUserContext from '../../hooks/useUserContext';

const Post = function () {
  // const queryClient = useQueryClient();
  const { postId } = useParams();
  const navigate = useNavigate();
  const { state: userState } = useUserContext();

  const { mutate: mutateDelete } = useMutation(
    async (postId, commentId) => {
      return await axios.delete(`/api/post/comment/${postId}/${commentId}`);
    },
    {
      onSuccess: (data) => {
        // delete comment from post
      },
    }
  );

  const { isLoading, data } = useQuery(['post', postId], async () => {
    return await axios.get(`/api/post/${postId}`);
  });

  const [showCommentForm, setShowCommetForm] = useState(false);

  useEffect(() => {
    if (!postId || !userState.isAuth) {
      navigate('/');
    }
  }, [postId, userState, navigate]);

  const deleteComment = (commentId) => {
    mutateDelete(postId, commentId);
  };

  let dispayPost;
  if (isLoading) {
    dispayPost = <Spinner />;
  } else {
    dispayPost = (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-6">
                <Link to="/posts" className="btn btn-light mb-3 float-left">
                  Back To Posts
                </Link>
              </div>
              <div className="col-6"></div>
            </div>

            <div className="card card-body mb-3">
              <div className="row">
                <div className="col-md-10">
                  <p className="lead">{data.data.text}</p>
                  <p className="lead">by {data.data.userEmail}</p>
                  <p className="m-0">
                    Created at{' '}
                    <Moment data={data.data.date} format="DD/MM/YYYY" />
                  </p>
                </div>
              </div>
            </div>

            {data.data.comments.length > 0 ? (
              <CommentList
                comments={data.data.comments}
                deleteComment={deleteComment}
              />
            ) : (
              <p>There is no comments yet</p>
            )}
            <button
              className="btn btn-primary my-1"
              onClick={() => setShowCommetForm(!showCommentForm)}
            >
              Add comment
            </button>

            {showCommentForm && <CommentForm post={data.data} />}
            <hr />
          </div>
        </div>
      </div>
    );
  }

  return dispayPost;
};

export default Post;
