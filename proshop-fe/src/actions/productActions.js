import axios from "axios";
import * as constants from "../constants/productConstants";

export const listProducts = () => async dispatch => {
  try {
    dispatch({ type: constants.PRODUCT_LIST_REQUEST });
    const { data } = await axios.get("/api/products");

    dispatch({ type: constants.PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: constants.PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const listProductsDetails = id => async dispatch => {
  try {
    dispatch({ type: constants.PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({ type: constants.PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: constants.PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const deleteProduct = id => async (dispatch, getState) => {
  try {
    const token = getState().userLogin.userInfo.token;
    dispatch({ type: constants.PRODUCT_DELETE_REQUEST });
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.delete(`/api/products/${id}`, config);

    dispatch({ type: constants.PRODUCT_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: constants.PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
