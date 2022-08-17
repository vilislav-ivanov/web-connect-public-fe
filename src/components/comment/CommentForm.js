import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import TextFieldGroup from '../common/TextFieldGroup';
import axios from 'axios';

function CommentForm({ post }) {
  const queryClient = useQueryClient();

  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState(null);

  const { mutate: addComment } = useMutation(
    async ({ data, postId }) => {
      return axios.post(`/api/post/comment/${postId}`, { text: data });
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData(['post', data.data._id], (_oldData) => {
          return {
            ...data,
          };
        });
      },
      onError: (error) => {
        setErrors({
          ...error.response.data,
        });
      },
    }
  );

  const onCommentSubmit = (e) => {
    e.preventDefault();
    addComment({ data: comment, postId: post._id });
    setComment('');
  };

  return (
    <div className="post-form mb-3">
      <div className="card card-info">
        <div className="card-header bg-info text-white">Say Somthing...</div>
        <div className="card-body">
          <form onSubmit={onCommentSubmit}>
            <TextFieldGroup
              name="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment"
              error={errors && errors.text}
            />
            <button
              type="submit"
              className="btn btn-primary"
              onClick={onCommentSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CommentForm;
