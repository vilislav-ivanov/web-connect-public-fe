import { useReducer, createContext, useEffect } from 'react';

import jwtDecode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';

const initState = {
  isAuth: false,
  user: {},
};

export const userContext = createContext();
const { Provider } = userContext;

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'login':
        return {
          isAuth: action.payload.exp > Date.now() / 1000,
          user: action.payload,
        };
      case 'logout':
        return {
          isAuth: false,
          user: {},
        };
      default:
        return state;
    }
  }, initState);

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (token) {
      const payload = jwtDecode(token);
      dispatch({ type: 'login', payload });

      if (payload.exp < Date.now() / 1000) {
        dispatch({ type: 'logout' });
        sessionStorage.removeItem('token');
      }

      setAuthToken(token);

      const logoutAfter = (payload.exp - Date.now() / 1000) * 1000;

      setTimeout(() => {
        dispatch({ type: 'logout' });
        sessionStorage.removeItem('token');
      }, logoutAfter);
    }
  }, []);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
