import { useCallback } from 'react';
import { login } from '../api/index';
import { useHistory } from 'react-router-dom';

export const useAuth = () => {
  const history = useHistory();

  const auth = useCallback(async (email: string, password: string) => {
    try {
      await login(email, password);
      history.push('trees');
    } catch (error) {
      console.log(error);
    }
  }, [history]);

  return auth;
};
