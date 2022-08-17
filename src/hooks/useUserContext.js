import { useContext } from 'react';
import { userContext } from './userContext';

const useUserContext = () => {
  return useContext(userContext);
};

export default useUserContext;
