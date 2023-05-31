import PropTypes from 'prop-types';

export const BURGER_API_URL = 'https://norma.nomoreparties.space/api';
export const INGREDIENTS_URL = '/ingredients';
export const ORDER_URL = '/orders';
export const FORGOT_PASS_URL = '/password-reset';
export const RESET_PASS_URL = '/password-reset/reset';
export const REGISTER_USER_URL = '/auth/register';
export const LOGIN_URL = '/auth/login';
export const USER_URL = '/auth/user';
export const TOKEN_URL = '/auth/token';
export const LOGOUT_URL = '/auth/logout';

export const IngredientPropTypes = PropTypes.shape({
  calories: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
}).isRequired