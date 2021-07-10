import axios from "axios";

import * as constants from "../constants/orderConstants";

export const createOrder = order => async (dispatch, getState) => {
  try {
    const token = getState().userLogin.userInfo.token;
    dispatch({ type: constants.ORDER_CREATE_REQUEST });
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/orders", order, config);

    dispatch({ type: constants.ORDER_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: constants.ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getOrderDetails = id => async (dispatch, getState) => {
  try {
    const token = getState().userLogin.userInfo.token;
    dispatch({ type: constants.ORDER_DETAILS_REQUEST });
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch({ type: constants.ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: constants.ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  try {
    const token = getState().userLogin.userInfo.token;
    dispatch({ type: constants.ORDER_PAY_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(`/api/orders/${id}/pay`, paymentResult, config);

    dispatch({ type: constants.ORDER_PAY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: constants.ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const listMyOrder = () => async (dispatch, getState) => {
  try {
    const token = getState().userLogin.userInfo.token;
    dispatch({ type: constants.ORDER_LIST_MY_REQUEST });
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`/api/orders/myorders`, config);

    dispatch({ type: constants.ORDER_LIST_MY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: constants.ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
