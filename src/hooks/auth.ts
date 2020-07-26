import { useCallback } from 'react';
import { login } from '../api/index';
import { useHistory } from 'react-router-dom';

export const useAuth = () => {
  const history = useHistory();

  const auth = useCallback(async (email: string, password: string) => {
    try {
      const response = await login(email, password);
      localStorage.setItem('token', response.token);
      localStorage.setItem('tokenExpiration', response.tokenExpiration);
      history.push('trees');
    } catch (error) {
      console.log(error);
    }
  }, [history]);

  return auth;
};
