import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getAuthData } from '../../services/reducers/rootReducer';

export const ProtectedRoute = ({ onlyUnAuth = false, element, ...rest }) => {
  const { userData, isAuthCheked } = useSelector(getAuthData);
  const location = useLocation();

  if (!isAuthCheked) {
    return null;
  }

  if (onlyUnAuth && userData) {
    const { from } = location.state || { from: { pathname: '/' } };

    return (
      <Navigate to={from} replace />
    )
  }

  if (!onlyUnAuth && !userData) {
    return (
      <Navigate to='/login' state={{ from: location }} replace />
    )
  }

  return element;
};

ProtectedRoute.propTypes = {
  element: PropTypes.element,
};
