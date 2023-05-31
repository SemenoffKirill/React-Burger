import { Navigate } from "react-router-dom"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../services/actions/user";
import PropTypes from 'prop-types';
import { getCookie } from "../../utils/cookie";

export const ProtectedRoute = ({ element, to }) => {
  const dispatch = useDispatch();
  const token = getCookie("accessToken");
  const userData = useSelector((state) => state.userInfo.user);

  useEffect(() => {
    if (!userData) {
      dispatch(getUserInfo(userData))
    }
  }, [dispatch, userData])

  return (userData && token) ? element : <Navigate to={to} replace/>;
}

ProtectedRoute.propTypes = {
  element: PropTypes.object.isRequired,
  to: PropTypes.string.isRequired
}
