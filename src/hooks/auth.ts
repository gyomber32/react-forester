import { useCallback } from 'react';
import { login, logout, authorization } from '../api/index';
import { useHistory } from 'react-router-dom';
import { useActions } from './store';

export const useLogin = () => {
  const { setAuth } = useActions();
  const history = useHistory();

  const loginCallback = useCallback(async (email: string, password: string) => {
    try {
      const loggedIn = await login(email, password);
      setAuth(loggedIn);
      history.push('trees');
    } catch (error) {
      console.log(error);
    }
  }, [history, setAuth]);

  return loginCallback;
};

export const useLogout = () => {
  const { setAuth } = useActions();
  const history = useHistory();

  const logoutCallback = useCallback(async () => {
    try {
      const loggedIn = await logout();
      setAuth(loggedIn);
      history.push('login');
    } catch (error) {
      console.log(error);
    }
  }, [history, setAuth]);

  return logoutCallback;
};

export const useAuthorization = () => {
  const { setAuth } = useActions();

  const authorizationCallback = useCallback(async () => {
    try {
      const loggedIn = await authorization();
      setAuth(loggedIn);
    } catch (error) {
      setAuth(false);
      console.log(error);
    }
  }, [setAuth])

  return authorizationCallback;
};
