import { useState, useEffect, useCallback } from 'react';
import { login } from '../api/index';
import { useHistory } from 'react-router-dom';

export const useAuth = () => {
  const history = useHistory();

  const handleLogin = useCallback(async (email: string, password: string) => {
    const response = await login(email, password);
    localStorage.setItem('token', response.token);
    localStorage.setItem('tokenExpiration', response.tokenExpiration);
    history.push('trees');
  }, []);

  return handleLogin;
};
