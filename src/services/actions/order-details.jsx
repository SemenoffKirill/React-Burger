import { getOrderData } from '../../utils/api';

export const ORDER_DETAILS_REQUEST = 'ORDER_DETAILS_REQUEST';
export const ORDER_DETAILS_SUCCESS = 'ORDER_DETAILS_SUCCESS';
export const ORDER_DETAILS_FAILED = 'ORDER_DETAILS_FAILED';
export const CLOSE_ORDER_DETAILS = 'CLOSE_ORDER_DETAILS';

export function getOrder(ids) {
  return function (dispatch) {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });
    getOrderData(ids)
      .then((res) => {
        dispatch({
          type: ORDER_DETAILS_SUCCESS,
          order: res,
        });
      })
      .catch((e) => {
        dispatch({
          type: ORDER_DETAILS_FAILED,
        });
        console.log(`Упс, ошибка! ${e}`)
      })
  };
}