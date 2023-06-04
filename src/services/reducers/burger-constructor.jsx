import {
  ADD_BUN,
  ADD_FILLING,
  DELETE_FILLING,
  SWAP_FILLING,
  CLEAR_CONSTRUCTOR,
} from '../actions/burger-constructor';

const initialState = {
  bun: {
    price: 0
  },
  fillings: [],
  totalPrice: 0,
};

export const burgerСonstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUN: {
      return {
        ...state,
        bun: action.bun,
        totalPrice: state.bun && state.totalPrice - state.bun.price * 2 + action.bun.price * 2,
      };
    }

    case ADD_FILLING: {
      return {
        ...state,
        fillings: [...state.fillings, action.filling],
        totalPrice: state.totalPrice + action.filling.price,
      };
    }

    case DELETE_FILLING: {
      return {
        ...state,
        fillings: [...state.fillings].filter(filling => filling.id !== action.filling.id),
        totalPrice: state.totalPrice - action.filling.price,
      };
    }

    case SWAP_FILLING: {
      const dragFillings = [...state.fillings];
      const targetFilling = dragFillings.splice(action.dropIndex, 1)[0];
      dragFillings.splice(
        action.dragIndex,
        0,
        targetFilling
      );

      return {
        ...state,
        fillings: dragFillings,
      };
    }

    case CLEAR_CONSTRUCTOR: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};