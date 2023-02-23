import React, { createContext, useEffect, useReducer } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import usePostLogin from 'api/hooks/useLogin';
import api from 'api/routes';

const initialState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
};

const isValidToken = (accessToken) =>
  accessToken && jwtDecode(accessToken).exp > Date.now() / 1000;

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT':
      const { isAuthenticated, user } = action.payload;
      return { ...state, isAuthenticated, isInitialised: true, user };
    case 'LOGIN':
    case 'REGISTER':
      return { ...state, isAuthenticated: true, user: action.payload.user };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false, user: null };
    default:
      return { ...state };
  }
};

const AuthContext = createContext({
  ...initialState,
  method: 'JWT',
  login: () => Promise.resolve(),
  logout: () => {},
  register: () => Promise.resolve(),
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { mutate, data } = usePostLogin();

  const setAuthState = (type, payload) => dispatch({ type, payload });

  const handleAuthResponse = ({ accessToken, user }, type) => {
    setSession(accessToken);
    setAuthState(type, { user });
  };

  const login = async (email, password) => {
    // await mutate({email, password})
    const response = await api.post.userLogin({ email, password });
    handleAuthResponse(response.data, 'LOGIN');
  };

  const register = async (email, username, password) => {
    const response = await api.post.createUser({ email, username, password });
    handleAuthResponse(response.data, 'REGISTER');
  };

  const logout = () => {
    setSession(null);
    setAuthState('LOGOUT');
  };

  useEffect(() => {
    (async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          const response = await api.get.me(); // '/api/auth/profile'
          setAuthState('INIT', {
            isAuthenticated: true,
            user: response.data.user,
          });
        } else {
          setAuthState('INIT', { isAuthenticated: false, user: null });
        }
      } catch (err) {
        console.error(err);
        setAuthState('INIT', { isAuthenticated: false, user: null });
      }
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{ ...state, method: 'JWT', login, logout, register }}
    >
      {state.isInitialised ? children : <h1>CARREGANDO</h1>}
    </AuthContext.Provider>
  );
};

export default AuthContext;
