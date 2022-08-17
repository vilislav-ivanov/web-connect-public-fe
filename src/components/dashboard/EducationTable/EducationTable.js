import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Moment from 'react-moment';
import axios from 'axios';
import Modal from '../../common/Modal';

function EducationTable({ educations }) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (id) => {
      return axios.delete(
        `https://dev-connect-public-be.herokuapp.com/api/profile/education/${id}`
      );
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(['profile']);
      },
    }
  );

  const educationTable = educations.map((education) => (
    <tr key={education._id}>
      <td>{education.school}</td>
      <td>{education.degree}</td>
      <td>
        <Moment date={education.from} format="DD/MM/YYYY" /> -{' '}
        {education.current ? (
          'now'
        ) : education.to ? (
          <Moment data={education.to} format="DD/MM/YYYY" />
        ) : (
          'no date provided'
        )}
      </td>
      <td className="d-flex justify-content-end">
        <Modal
          onConfirm={() => mutate(education._id)}
          actionType="delete"
          modalStyle="btn-danger"
          modalTitle="Delete Education"
          modalBody="Are you sure you want to delete education?"
        />
      </td>
    </tr>
  ));
  return (
    <div className="w-100">
      <h4 className="mb-4">Education Credentials</h4>
      <table className="table">
        <thead>
          <tr>
            <th className="w-25">School</th>
            <th className="w-25">Degree</th>
            <th className="w-25">Years</th>
            <th className="w-25" />
          </tr>
        </thead>
        <tbody>{educationTable}</tbody>
      </table>
    </div>
  );
}

export default EducationTable;
