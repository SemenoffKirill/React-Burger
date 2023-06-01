import {
  BURGER_API_URL, FORGOT_PASS_URL, RESET_PASS_URL, INGREDIENTS_URL, ORDER_URL, REGISTER_USER_URL, LOGIN_URL, USER_URL, TOKEN_URL, LOGOUT_URL
} from "./PropTypes";

const checkRes = (res) => {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(`Ошибка загрузки данных с сервера: ${err.status}`))
}

export function request(url, options) {
  return fetch(url, options).then(checkRes)
}

export function getIngredients() {
  return request(`${BURGER_API_URL}${INGREDIENTS_URL}`)
}

export function sendOrderRequest(data, accessToken) {
  return request(`${BURGER_API_URL}${ORDER_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': accessToken
    },
    body: JSON.stringify({
      "ingredients": data
    })
  })
}

export function forgotPasswordRequest(email) {
  return request(`${BURGER_API_URL}${FORGOT_PASS_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'email': email
    })
  })
}

export function resetPasswordRequest(password, token) {
  return request(`${BURGER_API_URL}${RESET_PASS_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'password': password,
      'token': token
    })
  })
}

export function registerUserRequest(email, password, name) {
  return request(`${BURGER_API_URL}${REGISTER_USER_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password,
      name
    })
  })
}

export function loginRequest(email, password) {
  return request(`${BURGER_API_URL}${LOGIN_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  })
}

export function checkUserDataRequest(accessToken) {
  return request(`${BURGER_API_URL}${USER_URL}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': accessToken
    }
  })
}

export function changeUserDataRequest(name, email, password, accessToken) {
  return request(`${BURGER_API_URL}${USER_URL}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'authorization': accessToken
    },
    body: JSON.stringify({
      name,
      email,
      password
    })
  })
}

export function refreshTokenRequest(refreshToken) {
  return request(`${BURGER_API_URL}${TOKEN_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: refreshToken
    })
  }
  )
}

export function signOutRequest(refreshToken) {
  return request(`${BURGER_API_URL}${LOGOUT_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: refreshToken
    })
  })
}