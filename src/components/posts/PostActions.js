import React from 'react';
import classnames from 'classnames';
import Modal from '../common/Modal';

const PostActions = ({
  isAuthor,
  onDeleteClick,
  onLikeClicked,
  onUnlikeClicked,
  likesCount,
  isPostAlreadyLikedByCurrentUser,
  disabled,
}) => {
  return (
    <span>
      <br />
      {isAuthor && (
        // <button className="btn btn-danger mr-1" onClick={onDeleteClick}>
        //   <i className="fas fa-times" />
        // </button>
        <Modal
          onConfirm={onDeleteClick}
          actionType={<i className="fas fa-times" />}
          modalStyle="btn-danger mr-1"
          modalTitle="Delete Post"
          modalBody="Are you sure you want to delete post?"
        />
      )}
      <button
        disabled={disabled}
        className="btn btn-light mr-1"
        onClick={onLikeClicked}
      >
        <i
          className={classnames('fas fa-thumbs-up', {
            'text-info': isPostAlreadyLikedByCurrentUser,
          })}
        />
        <span className="badge badge-light">{likesCount}</span>
      </button>
      <button className="btn btn-light mr-1" onClick={onUnlikeClicked}>
        <i className="text-secondary fas fa-thumbs-down" />
      </button>
    </span>
  );
};

export default PostActions;
