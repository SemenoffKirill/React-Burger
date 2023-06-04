import {
  CLOSE_ORDER_DETAILS,
  ORDER_DETAILS_FAILED,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS
} from '../actions/order-details';


const initialState = {
  order: null,
  orderDetailsRequest: false,
  orderDetailsFailed: false,
};

export const orderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST: {
      return {
        ...state,
        orderDetailsRequest: true,
        orderDetailsFailed: false,

      };
    }

    case ORDER_DETAILS_SUCCESS: {
      return {
        ...state,
        order: action.order,
        orderDetailsFailed: false,
        orderDetailsRequest: false,
      };
    }

    case ORDER_DETAILS_FAILED: {
      return {
        ...initialState,
        orderDetailsFailed: true,
      };
    }

    case CLOSE_ORDER_DETAILS: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};