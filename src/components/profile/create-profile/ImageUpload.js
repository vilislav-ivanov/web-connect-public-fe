import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Compressor from 'compressorjs';
import Spinner from '../../common/Spinner';

function ImageUpload() {
  const [displayError, setDisplayError] = useState(false);
  const [displayErrorText, setDisplayErrorText] = useState(null);
  const [displaySuccess, setDisplaySuccess] = useState(false);

  const { isLoading, mutate } = useMutation(
    async (formData) => {
      return await axios({
        method: 'post',
        url: 'https://dev-connect-public-be.herokuapp.com/api/image',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    {
      onSuccess: (data) => {
        setDisplaySuccess(true);
      },
      onError: (error) => {
        setDisplayError(true);
        setDisplayErrorText(error.response.data);
      },
    }
  );

  const imageHandler = (event) => {
    const file = event.target.files[0];
    if (file.type.split('/')[0] !== 'image') {
      setDisplayError(true);
    } else {
      const formData = new FormData();

      new Compressor(file, {
        quality: 0.1,
        success: (compressedResult) => {
          // compressedResult has the compressed file.
          // Use the compressed file to upload the images to your server.
          formData.append('image', compressedResult);
          mutate(formData);
        },
      });
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <input
        type="file"
        name="image"
        accept="image/*"
        multiple={false}
        onChange={imageHandler}
      />
      {displayError ? (
        <div className="text-danger py-3">
          {displayErrorText || 'Provided file is not allowed'}
        </div>
      ) : null}
      {displaySuccess ? (
        <div className="text-success py-3">Image uploaded successfully</div>
      ) : null}
    </>
  );
}

export default ImageUpload;
