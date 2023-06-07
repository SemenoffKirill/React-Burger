export const BASE_URL = 'https://norma.nomoreparties.space/api';

export const URL = {
  ingredients: `${BASE_URL}/ingredients`,
  orders: `${BASE_URL}/orders`,

  register: `${BASE_URL}/auth/register`,
  login: `${BASE_URL}/auth/login`,

  forgotPassword: `${BASE_URL}/password-reset`,
  resetPassword: `${BASE_URL}/password-reset/reset`,
  
  user: `${BASE_URL}/auth/user`,
  logout: `${BASE_URL}/auth/logout`,
  token: `${BASE_URL}/auth/token`,
};

const checkResponse = res => {
  if (res.ok) {
    return res.json()
  } else {
    return Promise.reject(`Ошибка: code ${res.status}`)
  }
}

export const getProductData = async () => {
  return await fetch(URL.ingredients)
    .then(checkResponse)
}

export const getOrderData = async (ids) => {
  return await fetch(URL.orders, {
    method: 'POST',
    body: JSON.stringify({
      ingredients: ids
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(checkResponse)
}

export const setNewUser = async (user) => {
  return await fetch(URL.register, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(checkResponse)
}

export function loginRequest(user) {
  return fetch(URL.login, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(checkResponse);
}

export function logoutRequest(refreshToken) {
  return fetch(URL.logout, {
    method: 'POST',
    body: JSON.stringify({ token: refreshToken }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(checkResponse);
}

export function resetPasswordRequest(data) {
  return fetch(URL.forgotPassword, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(checkResponse);
}

export function changePasswordRequest(data) {
  return fetch(URL.resetPassword, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(checkResponse);
}

export function getUserRequest(accessToken) {
  return fetch(URL.user, {
    headers: {
      authorization: accessToken,
    },
  }).then(checkResponse);
}

export function updateUserRequest(data, accessToken) {
  return fetch(URL.user, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      authorization: accessToken,
    },
  }).then(checkResponse);
}

export function updateTokenRequest() {
  return fetch(URL.token, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  }).then((data) => checkResponse(data));   
}