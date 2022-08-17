import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Moment from 'react-moment';
import Modal from '../../common/Modal';
import axios from 'axios';

export function ExperienceTable({ experiences }) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (id) => {
      return axios.delete(
        `https://dev-connect-public-be.herokuapp.com/api/profile/experience/${id}`
      );
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(['profile']);
      },
    }
  );
  const expTable = experiences.map((experience) => (
    <tr key={experience._id}>
      <td>{experience.company}</td>
      <td>{experience.title}</td>
      {/* <td>{moment(experience.from, 'DD/MM/YYYY')} - {experience.current ? 'now' : moment(experience.to, 'DD/MM/YYYY')}</td> */}
      <td>
        <Moment date={experience.from} format="DD/MM/YYYY" /> -{' '}
        {experience.current ? (
          'now'
        ) : experience.to ? (
          <Moment data={experience.to} format="DD/MM/YYYY" />
        ) : (
          'no date provided'
        )}
      </td>
      <td className="d-flex justify-content-end">
        <Modal
          onConfirm={() => mutate(experience._id)}
          actionType="delete"
          modalStyle="btn-danger"
          modalTitle="Delete Experience"
          modalBody="Are you sure you want to delete experience?"
        />
      </td>
    </tr>
  ));
  return (
    <div className="w-100">
      <h4 className="mb-4">Experience Credentials</h4>
      <table className="table">
        <thead>
          <tr>
            <th className="w-25">Company</th>
            <th className="w-25">Title</th>
            <th className="w-25">Years</th>
            <th className="w-25" />
          </tr>
        </thead>
        <tbody>{expTable}</tbody>
      </table>
    </div>
  );
}

export default ExperienceTable;
