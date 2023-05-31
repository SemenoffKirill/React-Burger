import {
  OPEN_ORDER_DETAILS_MODAL,
  OPEN_INGREDIENTS_MODAL
} from '../actions/modal';

const initialState = {
  isOrderDetailsModalOpen: false,
  isIngredientModalOpen: false,
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_ORDER_DETAILS_MODAL: {
      return {
        ...state,
        isOrderDetailsModalOpen: action.payload,
      };
    }
    case OPEN_INGREDIENTS_MODAL: {
      return {
        ...state,
        isIngredientModalOpen: action.payload
      };
    }
    default: {
      return state;
    }
  }
};