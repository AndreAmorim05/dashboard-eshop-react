import { useSelector } from 'react-redux';
import { selectCurrentToken } from 'auth/authSlice';
import jwtDecode from 'jwt-decode';

const useAuth = () => {
  const token = useSelector(selectCurrentToken);

  if (token) {
    const decoded = jwtDecode(token);
    const { publicID, username, role } = decoded.UserInfo;
    const isAuthenticated = true;
    return { isAuthenticated, role, username };
  }

  return { isAuthenticated: false, role: '', username: '' };
};

export default useAuth;
