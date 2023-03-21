import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { useRefreshMutation } from './authApiSlice';
import usePersist from 'hooks/usePersist';
import { useSelector } from 'react-redux';
import { selectCurrentToken, selectCurrentUser } from './authSlice';

const PersistLogin = ({ children }) => {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  const effectRan = useRef(false);
  const location = useLocation();
  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  const session = [
    '/session/singin',
    '/session/singup',
    '/session/forgot-password',
    '/session/404',
  ];

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
      // React 18 Strict Mode

      const verifyRefreshToken = async () => {
        console.log('verifying refresh token');
        try {
          //const response =
          await refresh();
          //const { accessToken } = response.data
          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };

      if (!token && persist) verifyRefreshToken();
    }

    return () => (effectRan.current = true);

    // eslint-disable-next-line
  }, []);

  if (session.includes(location.pathname)) return children;

  let content;
  if (!persist) {
    // persist: no
    content = children;
  } else if (isLoading) {
    //persist: yes, token: no
    content = <p>Loading...</p>;
  } else if (isError) {
    //persist: yes, token: no
    content = (
      <p className="errmsg">
        {`${error.data?.message} - `}
        <Link to="/session/signin">Please login again</Link>.
      </p>
    );
  } else if (isSuccess && trueSuccess) {
    //persist: yes, token: yes
    content = children;
  } else if (token && isUninitialized) {
    //persist: yes, token: yes
    content = children;
  }

  return content;
};
export default PersistLogin;
