import axios from "axios";
import * as constants from "../constants/userConstants";
import { ORDER_LIST_MY_RESET } from "../constants/orderConstants";

export const login = (email, password) => async dispatch => {
  try {
    dispatch({ type: constants.USER_LOGIN_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/users/login", { email, password }, config);

    dispatch({ type: constants.USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: constants.USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const logout = () => async dispatch => {
  localStorage.removeItem("userInfo");
  dispatch({ type: constants.USER_LOGOUT });
  dispatch({ type: constants.USER_DETAILS_RESET });
  dispatch({ type: ORDER_LIST_MY_RESET });
  dispatch({ type: constants.USER_LIST_RESET });
};

export const register = (name, email, password) => async dispatch => {
  try {
    dispatch({ type: constants.USER_REGISTER_REQUEST });
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/users", { name, email, password }, config);

    dispatch({ type: constants.USER_REGISTER_SUCCESS, payload: data });
    dispatch({
      type: constants.USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: constants.USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getUserDetails = id => async (dispatch, getState) => {
  try {
    const token = getState().userLogin.userInfo.token;
    dispatch({ type: constants.USER_DETAILS_REQUEST });
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(`/api/users/${id}`, config);

    dispatch({ type: constants.USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: constants.USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const updateUserProfile = user => async (dispatch, getState) => {
  try {
    const token = getState().userLogin.userInfo.token;
    dispatch({ type: constants.USER_UPDATE_PROFILE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put("/api/users/profile", user, config);

    dispatch({ type: constants.USER_UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: constants.USER_LOGIN_SUCCESS, payload: data });
    dispatch({ type: constants.USER_DETAILS_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: constants.USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getUserList = () => async (dispatch, getState) => {
  try {
    const token = getState().userLogin.userInfo.token;
    dispatch({ type: constants.USER_LIST_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get("/api/users", config);

    dispatch({ type: constants.USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: constants.USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const deleteUser = userId => async (dispatch, getState) => {
  try {
    const token = getState().userLogin.userInfo.token;
    dispatch({ type: constants.USER_DELETE_REQUEST });
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.delete(`/api/users/${userId}`, config);

    dispatch({ type: constants.USER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: constants.USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const updateUser = user => async (dispatch, getState) => {
  try {
    const token = getState().userLogin.userInfo.token;
    dispatch({ type: constants.USER_UPDATE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(`/api/users/${user._id}`, user, config);

    dispatch({ type: constants.USER_UPDATE_SUCCESS });
    dispatch({ type: constants.USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: constants.USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
