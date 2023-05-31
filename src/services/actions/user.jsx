import { checkUserDataRequest, loginRequest, refreshTokenRequest, registerUserRequest, signOutRequest, changeUserDataRequest } from "../../utils/Api";
import { setCookie, getCookie, deleteCookie } from "../../utils/cookie";

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const REGISTER = 'REGISTER';
export const REGISTER_SUCCESS = ' REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const SET_USER_DATA = 'SET_USER_DATA';
export const SET_USER_DATA_SUCCESS = 'SET_USER_DATA_SUCCESS';
export const SET_USER_DATA_FAILED = 'SET_USER_DATA_FAILED';

export const GET_USER_DATA = 'GET_USER_DATA';
export const GET_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS';
export const GET_USER_DATA_FAILED = 'GET_USER_DATA_FAILED';

export const SET_FORGOT_PASSWORD = 'SET_FORGOT_PASSWORD';

export const loginLoading = () => ({ type: LOGIN });
export const loginLoadingSuccess = (token) => ({ type: LOGIN_SUCCESS, payload: token });
export const loginLoadingFailed = () => ({ type: LOGIN_FAILED });

export const register = () => ({ type: REGISTER });
export const registerSuccess = (token) => ({ type: REGISTER_SUCCESS, payload: token });
export const registerFailed = () => ({ type: REGISTER_FAILED });

export const setUserDataLoading = () => ({ type: SET_USER_DATA });
export const setUserDataSuccess = (userData) => ({ type: SET_USER_DATA_SUCCESS, payload: userData });
export const setUserDataFailed = () => ({ type: SET_USER_DATA_FAILED });

export const getUserDataLoading = () => ({ type: GET_USER_DATA });
export const getUserDataLoadingSuccess = (res) => ({ type: GET_USER_DATA_SUCCESS, payload: res });
export const getUserDataLoadingFailed = () => ({ type: GET_USER_DATA_FAILED });

export const setLogoutLoading = () => ({ type: LOGOUT });
export const logoutSuccess = (token) => ({ type: LOGOUT_SUCCESS, payload: token });
export const logoutFailed = () => ({ type: LOGOUT_FAILED });

export const setForgotPassword = (state) => ({ type: SET_FORGOT_PASSWORD, payload: state });

export const setLogin = (email, password) => {
  return function (dispatch) {
    dispatch(loginLoading());

    loginRequest(email, password)
      .then(res => {
        dispatch(loginLoadingSuccess(res));
        setCookie("accessToken", res.accessToken)
        setCookie("refreshToken", res.refreshToken);
      })
      .catch((err) => {
        loginLoadingFailed()
        console.log(err)
      });
  }
};

export const setRegistration = (email, password, name) => {
  return function (dispatch) {
    dispatch(register());

    registerUserRequest(email, password, name)
      .then(res => {
        if (res) {
          dispatch(registerSuccess(res));
          setCookie("accessToken", res.accessToken);
          setCookie("refreshToken", res.refreshToken);
        }
      })
      .catch((err) => {
        registerFailed()
        console.log(err)
      })
  }
};

export const sendUserInfo = (name, email, password, token) => {
  return function (dispatch) {
    dispatch(setUserDataLoading());

    changeUserDataRequest(name, email, password, token)
      .then(res => {
        if (res) {
          dispatch(setUserDataSuccess(res));
        }
      })
      .catch((err) => {
        setUserDataFailed();
        console.log(err)
      })
  }
}

export const getUserInfo = () => {
  return function (dispatch) {
    dispatch(getUserDataLoading());
    checkUserDataRequest(getCookie("accessToken"))
      .then((res) => {
        if (res) {
          dispatch(getUserDataLoadingSuccess(res));
        }
      })
      .catch((err) => {
        if (err.message === "jwt expired" || "jwt malformed") {
          dispatch(setRefreshToken(getCookie("refreshToken")));
        }
        console.log(err)
      });
  }
};

export const setRefreshToken = (refreshToken) => {
  return function (dispatch) {
    refreshTokenRequest(refreshToken)
      .then((res) => {
        setCookie("accessToken", res.accessToken);
        setCookie("refreshToken", res.refreshToken);
        dispatch(getUserInfo(getCookie("refreshToken")));
      })
  }
}

export const setLogout = (token) => {
  return function (dispatch) {
    dispatch(setLogoutLoading());

    signOutRequest(token)
      .then((res) => {
        if (res) {
          deleteCookie("accessToken");
          deleteCookie("refreshToken");
          dispatch(logoutSuccess(res));
        }
      })
      .catch((err) => {
        logoutFailed();
        console.log(err)
      })
  }
}