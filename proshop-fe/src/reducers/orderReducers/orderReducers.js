import * as constants from "../../constants/orderConstants";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.ORDER_CREATE_REQUEST:
      return { loading: true };
    case constants.ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case constants.ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case constants.ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case constants.ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case constants.ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.ORDER_PAY_REQUEST:
      return { ...state, loading: true };
    case constants.ORDER_PAY_SUCCESS:
      return { loading: false, success: true };
    case constants.ORDER_PAY_FAIL:
      return { loading: false, error: action.payload };
    case constants.ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const orderListMyReducer = (state = { myOrders: [] }, action) => {
  switch (action.type) {
    case constants.ORDER_LIST_MY_REQUEST:
      return { loading: true };
    case constants.ORDER_LIST_MY_SUCCESS:
      return { loading: false, myOrders: action.payload };
    case constants.ORDER_LIST_MY_FAIL:
      return { loading: false, error: action.payload };
    case constants.ORDER_LIST_MY_RESET:
      return { myOrders: [] };
    default:
      return state;
  }
};

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case constants.ORDER_LIST_REQUEST:
      return { loading: true };
    case constants.ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case constants.ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
