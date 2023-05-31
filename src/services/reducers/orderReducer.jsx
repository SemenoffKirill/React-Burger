import {
  SET_ORDER_DETAILS,
  SET_ORDER_DETAILS_SUCCESS,
  SET_ORDER_DETAILS_FAILED,
} from '../actions/order';

const initialState = {
  orderDetails: null,
  orderRequest: false,
  orderFailed: false
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER_DETAILS: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false
      }
    }
    case SET_ORDER_DETAILS_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true
      }
    }
    case SET_ORDER_DETAILS_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderDetails: action.payload
      }
    }
    default: {
      return state;
    }
  }
};